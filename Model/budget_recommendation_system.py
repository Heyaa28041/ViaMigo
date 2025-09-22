#!/usr/bin/env python3
"""
Multi-City Budget Recommendation System
======================================
An ML-powered system that recommends restaurants and hotels
based on user queries, location, and preferences using real data.
"""

import pandas as pd
import numpy as np
import re
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import warnings
warnings.filterwarnings('ignore')

class MultiCityRecommendationSystem:
    def __init__(self):
        self.restaurant_data = None
        self.hotel_data = None
        self.restaurant_model = None
        self.hotel_model = None
        self.vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
        self.scaler = StandardScaler()
        self.city_data = self._initialize_city_data()
        
    def _initialize_city_data(self):
        """Initialize city-specific knowledge base"""
        return {
            'bangalore': {
                'popular_areas': ['koramangala', 'indiranagar', 'whitefield', 'marathahalli', 'btm', 'jayanagar', 'rajajinagar', 'malleshwaram', 'banashankari', 'basavanagudi'],
                'cuisine_specialty': ['south indian', 'karnataka', 'udupi', 'mangalorean'],
                'budget_threshold_restaurant': 500,
                'budget_threshold_hotel': 2000,
                'known_chains': ['mtr', 'ctr', 'vidyarthi bhavan', 'brahmins coffee bar']
            },
            'mumbai': {
                'popular_areas': ['bandra', 'andheri', 'juhu', 'powai', 'thane', 'navi mumbai', 'colaba', 'byculla'],
                'cuisine_specialty': ['maharashtrian', 'street food', 'vada pav', 'pav bhaji'],
                'budget_threshold_restaurant': 600,
                'budget_threshold_hotel': 3000,
                'known_chains': ['gokul', 'hotel ram ashraya', 'trishna']
            },
            'delhi': {
                'popular_areas': ['cp', 'karol bagh', 'lajpat nagar', 'saket', 'gurgaon', 'noida', 'dwarka'],
                'cuisine_specialty': ['north indian', 'mughlai', 'street food', 'paranthe'],
                'budget_threshold_restaurant': 700,
                'budget_threshold_hotel': 2500,
                'known_chains': ['karim', 'al jawahar', 'paranthe wali gali']
            },
            'chennai': {
                'popular_areas': ['t nagar', 'anna nagar', 'adyar', 'velachery', 'omr', 'ecr'],
                'cuisine_specialty': ['tamil', 'chettinad', 'filter coffee', 'idli dosa'],
                'budget_threshold_restaurant': 400,
                'budget_threshold_hotel': 1800,
                'known_chains': ['saravana bhavan', 'murugan idli shop', 'adyar ananda bhavan']
            },
            'pune': {
                'popular_areas': ['koregaon park', 'camp', 'shivaji nagar', 'kothrud', 'aundh', 'viman nagar'],
                'cuisine_specialty': ['maharashtrian', 'misal pav', 'vada pav'],
                'budget_threshold_restaurant': 500,
                'budget_threshold_hotel': 2000,
                'known_chains': ['bedekar misal', 'chitale bandhu']
            },
            'hyderabad': {
                'popular_areas': ['hitech city', 'gachibowli', 'jubilee hills', 'banjara hills', 'secunderabad'],
                'cuisine_specialty': ['hyderabadi', 'biryani', 'haleem', 'kebabs'],
                'budget_threshold_restaurant': 450,
                'budget_threshold_hotel': 1900,
                'known_chains': ['paradise', 'bawarchi', 'shah ghouse']
            }
        }
        
    def detect_city_from_query(self, query):
        """Detect city from user query"""
        query = query.lower()
        
        for city in self.city_data.keys():
            if city in query:
                return city
                
            # Check for popular areas
            for area in self.city_data[city]['popular_areas']:
                if area in query:
                    return city
        
        # Default to bangalore as dataset is primarily bangalore
        return 'bangalore'
        
    def extract_preferences(self, query):
        """Extract user preferences from query"""
        query = query.lower()
        preferences = {
            'budget_only': False,
            'cuisine': [],
            'meal_type': [],
            'rating_min': 0,
            'show_premium': False
        }
        
        # Budget indicators
        budget_keywords = ['budget', 'cheap', 'affordable', 'low cost', 'economical']
        preferences['budget_only'] = any(keyword in query for keyword in budget_keywords)
        
        # Premium indicators
        premium_keywords = ['premium', 'luxury', 'high end', 'expensive', 'fine dining', 'best']
        preferences['show_premium'] = any(keyword in query for keyword in premium_keywords)
        
        # Cuisine preferences
        cuisine_keywords = {
            'south indian': ['south indian', 'dosa', 'idli', 'sambar', 'udupi'],
            'north indian': ['north indian', 'roti', 'naan', 'punjabi', 'dal'],
            'chinese': ['chinese', 'noodles', 'fried rice', 'manchurian'],
            'italian': ['italian', 'pizza', 'pasta', 'continental'],
            'fast food': ['fast food', 'burger', 'sandwich'],
            'biryani': ['biryani', 'dum biryani', 'chicken biryani'],
            'street food': ['street food', 'chaat', 'pani puri']
        }
        
        for cuisine, keywords in cuisine_keywords.items():
            if any(keyword in query for keyword in keywords):
                preferences['cuisine'].append(cuisine)
        
        # Meal type
        meal_keywords = {
            'breakfast': ['breakfast', 'morning'],
            'lunch': ['lunch', 'afternoon'],
            'dinner': ['dinner', 'evening'],
            'snacks': ['snacks', 'evening snacks']
        }
        
        for meal, keywords in meal_keywords.items():
            if any(keyword in query for keyword in keywords):
                preferences['meal_type'].append(meal)
        
        # Rating preferences
        if 'highly rated' in query or 'top rated' in query or 'best rated' in query:
            preferences['rating_min'] = 4.0
        elif 'good' in query:
            preferences['rating_min'] = 3.5
            
        return preferences
    
    def _detect_restaurant_city(self, row):
        """Detect city for a restaurant row"""
        location = str(row.get('location', '')).lower()
        address = str(row.get('address', '')).lower()
        city_listed = str(row.get('listed_in(city)', '')).lower()
        
        combined_text = f"{location} {address} {city_listed}"
        
        for city in self.city_data.keys():
            if city in combined_text:
                return city
            for area in self.city_data[city]['popular_areas']:
                if area in combined_text:
                    return city
        
        return 'bangalore'  # Default
    
    def _detect_hotel_city(self, row):
        """Detect city for a hotel row"""
        location = str(row.get('location', '')).lower()
        
        for city in self.city_data.keys():
            if city in location:
                return city
            for area in self.city_data[city]['popular_areas']:
                if area in location:
                    return city
        
        return 'bangalore'  # Default
    
    def _classify_restaurant_budget(self, row):
        """Classify restaurant as budget friendly based on city"""
        city = row['detected_city']
        cost = row['numeric_cost']
        threshold = self.city_data[city]['budget_threshold_restaurant']
        return 1 if cost <= threshold else 0
    
    def _classify_hotel_budget(self, row):
        """Classify hotel as budget friendly based on city"""
        city = row['detected_city']
        price = row['numeric_price']
        threshold = self.city_data[city]['budget_threshold_hotel']
        return 1 if price <= threshold else 0
    def load_and_preprocess_data(self):
        """Load and preprocess restaurant and hotel data"""
        print("Loading and preprocessing data...")
        
        # Load restaurant data (Zomato)
        try:
            self.restaurant_data = pd.read_csv('zomato.csv')
            self.restaurant_data = self._clean_restaurant_data(self.restaurant_data)
        except Exception as e:
            print(f"Error loading restaurant data: {e}")
            
        # Load hotel data (OYO)
        try:
            self.hotel_data = pd.read_csv('oyobanglore.csv')
            self.hotel_data = self._clean_hotel_data(self.hotel_data)
        except Exception as e:
            print(f"Error loading hotel data: {e}")
            
        print("Data preprocessing completed!")
        
    def _clean_restaurant_data(self, df):
        """Clean and preprocess restaurant data"""
        # Clean rate column
        df['rate'] = df['rate'].astype(str)
        df['numeric_rate'] = df['rate'].apply(self._extract_rating)
        
        # Clean cost column
        df['cost'] = df['approx_cost(for two people)'].astype(str)
        df['numeric_cost'] = df['cost'].apply(self._extract_cost)
        
        # Detect city for each restaurant and create budget category
        df['detected_city'] = df.apply(self._detect_restaurant_city, axis=1)
        df['is_budget_friendly'] = df.apply(self._classify_restaurant_budget, axis=1)
        
        # Clean text fields
        df['cuisines'] = df['cuisines'].fillna('')
        df['location'] = df['location'].fillna('')
        df['rest_type'] = df['rest_type'].fillna('')
        
        # Create combined text features
        df['combined_features'] = (df['cuisines'] + ' ' + 
                                 df['location'] + ' ' + 
                                 df['rest_type']).str.lower()
        
        # Remove rows with invalid data
        df = df.dropna(subset=['numeric_rate', 'numeric_cost'])
        df = df[df['numeric_cost'] > 0]
        
        return df
        
    def _clean_hotel_data(self, df):
        """Clean and preprocess hotel data"""
        # Clean price column
        df['numeric_price'] = df['price'].apply(self._extract_cost)
        
        # Clean ratings
        df['numeric_rating'] = df['ratings'].apply(self._extract_rating)
        
        # Detect city for each hotel and create budget category
        df['detected_city'] = df.apply(self._detect_hotel_city, axis=1)
        df['is_budget_friendly'] = df.apply(self._classify_hotel_budget, axis=1)
        
        # Clean text fields
        df['location'] = df['location'].fillna('')
        df['condition'] = df['condition'].fillna('')
        
        # Combine features
        features = []
        for col in ['feature1', 'feature2', 'feature3']:
            if col in df.columns:
                df[col] = df[col].fillna('')
                features.append(df[col])
        
        df['combined_features'] = (df['location'] + ' ' + 
                                 df['condition'] + ' ' + 
                                 ' '.join(features)).str.lower()
        
        # Remove rows with invalid data
        df = df.dropna(subset=['numeric_price', 'numeric_rating'])
        df = df[df['numeric_price'] > 0]
        
        return df
        
    def _extract_rating(self, rating_str):
        """Extract numeric rating from string"""
        if pd.isna(rating_str) or rating_str == 'nan':
            return 3.0  # Default rating
        
        rating_str = str(rating_str).strip()
        
        # Extract number from rating string (e.g., "4.1/5" -> 4.1)
        match = re.search(r'(\d+\.?\d*)', rating_str)
        if match:
            rating = float(match.group(1))
            # Normalize to 5-point scale if needed
            if rating > 5:
                rating = rating / 2  # Assume 10-point scale
            return min(max(rating, 0), 5)
        
        return 3.0  # Default rating
        
    def _extract_cost(self, cost_str):
        """Extract numeric cost from string"""
        if pd.isna(cost_str) or cost_str == 'nan':
            return 0
        
        cost_str = str(cost_str).strip()
        
        # Remove commas and extract numbers
        cost_str = cost_str.replace(',', '')
        match = re.search(r'(\d+)', cost_str)
        if match:
            return int(match.group(1))
        
        return 0
        
    def train_models(self):
        """Train ML models for budget classification"""
        print("Training ML models...")
        
        if self.restaurant_data is not None and len(self.restaurant_data) > 0:
            self._train_restaurant_model()
            
        if self.hotel_data is not None and len(self.hotel_data) > 0:
            self._train_hotel_model()
            
        print("Model training completed!")
        
    def _train_restaurant_model(self):
        """Train restaurant budget classification model"""
        df = self.restaurant_data.copy()
        
        # Prepare features
        X = pd.DataFrame()
        X['rating'] = df['numeric_rate']
        X['cost'] = df['numeric_cost']
        X['votes'] = pd.to_numeric(df['votes'], errors='coerce').fillna(0)
        
        # Encode categorical features
        le_location = LabelEncoder()
        le_type = LabelEncoder()
        
        X['location_encoded'] = le_location.fit_transform(df['location'].astype(str))
        X['type_encoded'] = le_type.fit_transform(df['rest_type'].astype(str))
        
        y = df['is_budget_friendly']
        
        # Train model
        if len(X) > 10:  # Ensure we have enough data
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            
            self.restaurant_model = RandomForestClassifier(n_estimators=100, random_state=42)
            self.restaurant_model.fit(X_train, y_train)
            
            # Store encoders for future use
            self.restaurant_le_location = le_location
            self.restaurant_le_type = le_type
            
            print(f"Restaurant model accuracy: {self.restaurant_model.score(X_test, y_test):.3f}")
        
    def _train_hotel_model(self):
        """Train hotel budget classification model"""
        df = self.hotel_data.copy()
        
        # Prepare features
        X = pd.DataFrame()
        X['rating'] = df['numeric_rating']
        X['price'] = df['numeric_price']
        X['stars'] = pd.to_numeric(df['stars'], errors='coerce').fillna(3)
        
        # Encode location
        le_location = LabelEncoder()
        X['location_encoded'] = le_location.fit_transform(df['location'].astype(str))
        
        y = df['is_budget_friendly']
        
        # Train model
        if len(X) > 10:  # Ensure we have enough data
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            
            self.hotel_model = RandomForestClassifier(n_estimators=100, random_state=42)
            self.hotel_model.fit(X_train, y_train)
            
            # Store encoder for future use
            self.hotel_le_location = le_location
            
            print(f"Hotel model accuracy: {self.hotel_model.score(X_test, y_test):.3f}")
    
    def get_recommendations(self, user_query, num_recommendations=10):
        """Get recommendations based on user query with city and preference support"""
        user_query = user_query.lower().strip()
        
        # Detect city and extract preferences
        detected_city = self.detect_city_from_query(user_query)
        preferences = self.extract_preferences(user_query)
        
        # Determine if user wants restaurants or hotels
        restaurant_keywords = ['restaurant', 'food', 'eat', 'dining', 'cuisine', 'meal', 'lunch', 'dinner', 'breakfast']
        hotel_keywords = ['hotel', 'stay', 'accommodation', 'room', 'lodge', 'guest', 'night']
        
        wants_restaurants = any(keyword in user_query for keyword in restaurant_keywords)
        wants_hotels = any(keyword in user_query for keyword in hotel_keywords)
        
        # If neither specified, provide both
        if not wants_restaurants and not wants_hotels:
            wants_restaurants = wants_hotels = True
            
        recommendations = []
        
        if wants_restaurants and self.restaurant_data is not None:
            restaurant_recs = self._get_restaurant_recommendations(user_query, detected_city, preferences, num_recommendations//2 if wants_hotels else num_recommendations)
            recommendations.extend(restaurant_recs)
            
        if wants_hotels and self.hotel_data is not None:
            hotel_recs = self._get_hotel_recommendations(user_query, detected_city, preferences, num_recommendations//2 if wants_restaurants else num_recommendations)
            recommendations.extend(hotel_recs)
            
        return recommendations, detected_city, preferences
        
    def _get_restaurant_recommendations(self, query, detected_city, preferences, num_recs):
        """Get restaurant recommendations based on city and preferences"""
        df = self.restaurant_data.copy()
        
        # Filter by city if specific city detected
        if detected_city != 'bangalore' or any(city in query for city in self.city_data.keys()):
            df = df[df['detected_city'] == detected_city]
        
        # Apply budget filter based on preferences
        if preferences['budget_only']:
            df = df[df['is_budget_friendly'] == 1]
        elif not preferences['show_premium']:
            # Show both budget and mid-range, but prioritize budget
            pass
        
        # Filter by rating if specified
        if preferences['rating_min'] > 0:
            df = df[df['numeric_rate'] >= preferences['rating_min']]
        
        # Filter by cuisine preferences
        if preferences['cuisine']:
            cuisine_filter = df['cuisines'].str.lower().str.contains('|'.join(preferences['cuisine']), na=False, case=False)
            df = df[cuisine_filter]
        
        if len(df) == 0:
            return []
        
        # Create scoring based on preferences and city
        df = df.copy()
        df['score'] = self._calculate_restaurant_score(df, preferences, detected_city)
        
        # Remove duplicates based on restaurant name and get diverse recommendations
        df = self._get_diverse_restaurants(df, num_recs)
        
        recommendations = []
        for _, row in df.iterrows():
            rec = {
                'type': 'Restaurant',
                'name': row['name'],
                'location': row['location'],
                'city': row['detected_city'].title(),
                'rating': f"{row['numeric_rate']}/5",
                'cost': f"Rs {row['numeric_cost']} for two",
                'cuisine': row['cuisines'],
                'budget_friendly': bool(row['is_budget_friendly'])
            }
            recommendations.append(rec)
            
        return recommendations
    
    def _calculate_restaurant_score(self, df, preferences, city):
        """Calculate score for restaurants based on preferences"""
        scores = df['numeric_rate'] * 2  # Base score from rating
        
        # Budget bonus
        if preferences['budget_only']:
            scores += df['is_budget_friendly'] * 1
        else:
            # Slight penalty for expensive places if not explicitly asking for premium
            city_threshold = self.city_data[city]['budget_threshold_restaurant']
            scores -= (df['numeric_cost'] > city_threshold * 2) * 0.5
        
        # City specialty bonus
        city_cuisines = self.city_data[city]['cuisine_specialty']
        for specialty in city_cuisines:
            cuisine_match = df['cuisines'].str.lower().str.contains(specialty, na=False, case=False)
            scores += cuisine_match * 0.3
        
        # Known chain bonus
        known_chains = self.city_data[city]['known_chains']
        for chain in known_chains:
            chain_match = df['name'].str.lower().str.contains(chain, na=False, case=False)
            scores += chain_match * 0.2
        
        # Vote count bonus (popularity)
        votes = pd.to_numeric(df['votes'], errors='coerce').fillna(0)
        scores += np.log1p(votes) * 0.1
        
        return scores
    
    def _get_diverse_restaurants(self, df, num_recs):
        """Get diverse restaurant recommendations by avoiding duplicates and ensuring variety"""
        # Sort by score first
        df = df.sort_values('score', ascending=False)
        
        selected_restaurants = []
        seen_names = set()
        
        # Get unique restaurants without duplicates
        for _, row in df.iterrows():
            if len(selected_restaurants) >= num_recs:
                break
            
            name = row['name'].lower().strip()
            
            # Skip if we've seen this exact name
            if name in seen_names:
                continue
            
            selected_restaurants.append(row)
            seen_names.add(name)
        
        # Convert back to DataFrame
        if selected_restaurants:
            return pd.DataFrame(selected_restaurants).reset_index(drop=True)
        else:
            return df.head(0)  # Empty DataFrame
        
    def _get_hotel_recommendations(self, query, detected_city, preferences, num_recs):
        """Get hotel recommendations based on city and preferences"""
        df = self.hotel_data.copy()
        
        # Filter by city if specific city detected
        if detected_city != 'bangalore' or any(city in query for city in self.city_data.keys()):
            df = df[df['detected_city'] == detected_city]
        
        # Apply budget filter based on preferences
        if preferences['budget_only']:
            df = df[df['is_budget_friendly'] == 1]
        elif not preferences['show_premium']:
            pass  # Show all price ranges but prioritize budget
        
        # Filter by rating if specified
        if preferences['rating_min'] > 0:
            df = df[df['numeric_rating'] >= preferences['rating_min']]
        
        if len(df) == 0:
            return []
        
        # Calculate scores
        df = df.copy()
        df['score'] = self._calculate_hotel_score(df, preferences, detected_city)
        
        # Remove duplicates and get diverse recommendations
        df = self._get_diverse_hotels(df, num_recs)
        
        recommendations = []
        for _, row in df.iterrows():
            rec = {
                'type': 'Hotel',
                'name': row['name'],
                'location': row['location'],
                'city': row['detected_city'].title(),
                'rating': f"{row['numeric_rating']}/5",
                'price': f"Rs {row['numeric_price']} per night",
                'stars': f"{row['stars']} star",
                'budget_friendly': bool(row['is_budget_friendly'])
            }
            recommendations.append(rec)
            
        return recommendations
    
    def _calculate_hotel_score(self, df, preferences, city):
        """Calculate score for hotels based on preferences"""
        scores = df['numeric_rating'] * 2  # Base score from rating
        
        # Budget bonus
        if preferences['budget_only']:
            scores += df['is_budget_friendly'] * 1
        else:
            city_threshold = self.city_data[city]['budget_threshold_hotel']
            scores -= (df['numeric_price'] > city_threshold * 2) * 0.5
        
        # Star rating bonus
        stars = pd.to_numeric(df['stars'], errors='coerce').fillna(3)
        scores += stars * 0.2
        
        return scores
    
    def _get_diverse_hotels(self, df, num_recs):
        """Get diverse hotel recommendations by avoiding duplicates"""
        # Sort by score first
        df = df.sort_values('score', ascending=False)
        
        selected_hotels = []
        seen_names = set()
        seen_locations = set()
        
        for _, row in df.iterrows():
            if len(selected_hotels) >= num_recs:
                break
            
            name = row['name'].lower().strip()
            location = row['location'].lower().strip()
            
            # Skip exact duplicate names
            if name in seen_names:
                continue
            
            # Add the hotel
            selected_hotels.append(row)
            seen_names.add(name)
            seen_locations.add(location)
        
        # If we don't have enough diverse hotels, fill with remaining ones
        if len(selected_hotels) < num_recs:
            for _, row in df.iterrows():
                if len(selected_hotels) >= num_recs:
                    break
                
                name = row['name'].lower().strip()
                if name not in seen_names:
                    selected_hotels.append(row)
                    seen_names.add(name)
        
        # Convert back to DataFrame
        if selected_hotels:
            return pd.DataFrame(selected_hotels).reset_index(drop=True)
        else:
            return df.head(0)  # Empty DataFrame
    
    def print_recommendations(self, recommendations, detected_city=None, preferences=None):
        """Print recommendations with city and preference information"""
        if not recommendations:
            print("No recommendations found. Try a different query or location!")
            return
        
        print(f"\nFound {len(recommendations)} Recommendations")
        if detected_city:
            print(f"City: {detected_city.title()}")
        if preferences and (preferences['budget_only'] or preferences['show_premium']):
            pref_type = "Budget" if preferences['budget_only'] else "Premium" if preferences['show_premium'] else "All"
            print(f"Preference: {pref_type}")
        print()
        
        for i, rec in enumerate(recommendations, 1):
            print(f"{i}. {rec['name']} ({rec['type']})")
            print(f"   Location: {rec['location']}")
            if 'city' in rec:
                print(f"   City: {rec['city']}")
            print(f"   Rating: {rec['rating']}")
            
            if rec['type'] == 'Restaurant':
                print(f"   Cost: {rec['cost']}")
                print(f"   Cuisine: {rec['cuisine']}")
            else:  # Hotel
                print(f"   Price: {rec['price']}")
                print(f"   Category: {rec['stars']}")
            
            budget_status = "Yes" if rec['budget_friendly'] else "No"
            print(f"   Budget Friendly: {budget_status}")
            print()

def main():
    """Main function to run the recommendation system"""
    print("Multi-City Recommendation System")
    print("=" * 50)
    
    # Initialize system
    system = MultiCityRecommendationSystem()
    
    # Load and process data
    system.load_and_preprocess_data()
    
    # Train models
    system.train_models()
    
    print("\nSystem ready! Ask for recommendations with preferences and locations.")
    print("Examples:")
    print("- 'budget restaurants in Mumbai'")
    print("- 'best biryani places in Hyderabad'")
    print("- 'luxury hotels in Delhi'")
    print("- 'south indian food in Chennai'")
    print("Type 'quit' to exit.\n")
    
    # Interactive loop
    while True:
        try:
            user_input = input("What are you looking for? ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("Thanks for using the Recommendation System!")
                break
                
            if not user_input:
                print("Please enter a query!")
                continue
            
            # Get recommendations
            recommendations, detected_city, preferences = system.get_recommendations(user_input)
            system.print_recommendations(recommendations, detected_city, preferences)
            
        except KeyboardInterrupt:
            print("\nThanks for using the Recommendation System!")
            break
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()