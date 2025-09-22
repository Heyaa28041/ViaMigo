# Multi-City Recommendation System - Complete Guide

## Overview
This is an AI-powered restaurant and hotel recommendation system that works across multiple Indian cities. It uses machine learning to understand your preferences and suggest the best places to eat or stay.

## Key Terminologies Used

### Technical Terms
- **ML (Machine Learning)**: Computer algorithms that learn patterns from data to make predictions
- **Random Forest**: A machine learning algorithm that uses multiple decision trees to make accurate predictions
- **Classification**: Categorizing items (like labeling restaurants as "budget-friendly" or "premium")
- **Feature Engineering**: Creating useful data points from raw data (like extracting ratings from text)
- **Scoring Algorithm**: Mathematical method to rank recommendations based on multiple factors
- **Deduplication**: Removing duplicate entries to ensure variety

### System Components
- **MultiCityRecommendationSystem**: Main class that handles all recommendation logic
- **Budget Thresholds**: Price limits that define what's considered "budget-friendly" in each city
- **Preference Detection**: System's ability to understand what you want from your text query
- **City Detection**: Automatically identifying which city you're asking about
- **Diversity Algorithm**: Ensures you get different types of restaurants, not just repeats

### Data Terms
- **Zomato Data**: Restaurant information including ratings, prices, cuisines, locations
- **OYO Data**: Hotel information including prices, ratings, amenities
- **Cuisine Types**: Categories like "South Indian", "North Indian", "Chinese", etc.
- **Rating Scale**: 1-5 star system for restaurant/hotel quality
- **Cost for Two**: Restaurant pricing shown as amount for two people

## City-Specific Information

### Supported Cities with Budget Thresholds:
- **Bangalore**: Restaurants ≤ Rs 500, Hotels ≤ Rs 2000
- **Mumbai**: Restaurants ≤ Rs 600, Hotels ≤ Rs 3000  
- **Delhi**: Restaurants ≤ Rs 700, Hotels ≤ Rs 2500
- **Chennai**: Restaurants ≤ Rs 400, Hotels ≤ Rs 1800
- **Pune**: Restaurants ≤ Rs 500, Hotels ≤ Rs 2000
- **Hyderabad**: Restaurants ≤ Rs 450, Hotels ≤ Rs 1900

### City Specialties:
- **Bangalore**: South Indian, Udupi, Mangalorean cuisine
- **Mumbai**: Maharashtrian, Street food, Vada Pav
- **Delhi**: North Indian, Mughlai, Paranthas
- **Chennai**: Tamil, Chettinad, Filter coffee
- **Pune**: Maharashtrian, Misal Pav
- **Hyderabad**: Biryani, Haleem, Kebabs

## How to Run the System

### Prerequisites
Make sure you have Python installed and run this command first:
```bash
pip install pandas scikit-learn numpy
```

### Method 1: Interactive Mode (Recommended)
```bash
python budget_recommendation_system.py
```
This starts an interactive session where you can type queries and get recommendations.

### Method 2: Single Query
```bash
python demo.py "your query here"
```
Examples:
```bash
python demo.py "budget restaurants in Mumbai"
python demo.py "best biryani in Hyderabad"
python demo.py "luxury hotels in Delhi"
```

### Method 3: Test All Features
```bash
python test_system.py
```
This runs multiple test queries to show how the system works.

## Query Types You Can Use

### Budget Queries
- "budget friendly restaurants"
- "cheap hotels"
- "affordable food"
- "economical dining"

### Premium Queries
- "luxury hotels"
- "premium dining"
- "best restaurants"
- "high-end places"

### City-Specific Queries
- "restaurants in Mumbai"
- "hotels in Delhi"
- "food in Chennai"
- "places in Bangalore"

### Cuisine-Specific Queries
- "biryani restaurants"
- "south indian food"
- "chinese restaurants"
- "pizza places"

### Combined Queries
- "budget south indian food in Chennai"
- "luxury hotels in Mumbai"
- "best biryani places in Hyderabad"
- "cheap restaurants in Banashankari"

## Understanding the Output

### Restaurant Information Shown:
- **Name**: Restaurant name
- **Location**: Area/locality
- **City**: Detected city
- **Rating**: Star rating out of 5
- **Cost**: Price for two people
- **Cuisine**: Type of food served
- **Budget Friendly**: Yes/No classification

### Hotel Information Shown:
- **Name**: Hotel name
- **Location**: Area/locality  
- **City**: Detected city
- **Rating**: Star rating out of 5
- **Price**: Cost per night
- **Category**: Star category of hotel
- **Budget Friendly**: Yes/No classification

## How the System Works Behind the Scenes

### Step 1: Query Analysis
- Detects which city you're asking about
- Identifies if you want budget or premium options
- Extracts cuisine preferences
- Determines if you want restaurants or hotels

### Step 2: Data Filtering
- Filters data by detected city
- Applies budget/premium filters
- Filters by cuisine if specified
- Removes low-rated places if you asked for "best"

### Step 3: Smart Scoring
- Rates places based on customer ratings
- Gives bonus points for city specialties
- Considers popularity (number of reviews)
- Adjusts for price preferences

### Step 4: Diversity Selection
- Removes duplicate restaurant names
- Ensures variety in cuisine types
- Mixes different price ranges
- Includes different locations

## Sample Interaction

```
What are you looking for? budget restaurants in Mumbai

Found 5 Recommendations
City: Mumbai
Preference: Budget

1. Trishna (Restaurant)
   Location: Colaba
   City: Mumbai
   Rating: 4.5/5
   Cost: Rs 500 for two
   Cuisine: Seafood, Maharashtrian
   Budget Friendly: Yes

2. Cafe Madras (Restaurant)
   Location: Bandra
   City: Mumbai
   Rating: 4.2/5
   Cost: Rs 400 for two
   Cuisine: South Indian
   Budget Friendly: Yes
```

## Troubleshooting

### Common Issues:
1. **"No recommendations found"**: Try a broader query or different city
2. **System shows only Bangalore results**: The dataset is primarily Bangalore-based
3. **Duplicate results**: The system has deduplication, but some may still appear
4. **Python errors**: Make sure all required packages are installed

### Getting Better Results:
- Be specific about location: "restaurants in Koramangala" vs "restaurants"
- Specify preferences: "budget" or "luxury" or "best"  
- Mention cuisine: "south indian", "chinese", "biryani"
- Use city names: "Mumbai", "Delhi", "Chennai"

## Files in the System

- `budget_recommendation_system.py` - Main system code
- `demo.py` - Quick search demo
- `test_system.py` - Test all features
- `zomato.csv` - Restaurant data
- `oyobanglore.csv` - Hotel data
- `README.md` - Basic documentation
- `GUIDE.md` - This complete guide

## Data Sources
- **Restaurant Data**: 51,000+ restaurants from Zomato
- **Hotel Data**: 400+ hotels from OYO
- **Coverage**: Primarily Bangalore with some other cities
- **Information**: Ratings, prices, locations, cuisines, reviews

The system is designed to be user-friendly - just type what you're looking for in natural language and it will understand and provide relevant recommendations!