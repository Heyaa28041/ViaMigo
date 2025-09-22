<<<<<<< HEAD
#!/usr/bin/env python3
"""
Test script for the Budget Recommendation System
"""

from budget_recommendation_system import MultiCityRecommendationSystem

def test_system():
    """Test the system with sample queries"""
    print("Testing Multi-City Recommendation System")
    print("=" * 50)
    
    # Initialize and load system
    system = MultiCityRecommendationSystem()
    system.load_and_preprocess_data()
    system.train_models()
    
    # Test queries with different cities and preferences
    test_queries = [
        'budget friendly restaurants',
        'cheap hotels',
        'best south indian food in Chennai',
        'luxury hotels in Mumbai',
        'biryani restaurants in Hyderabad',
        'budget restaurants in Banashankari',
        'premium dining in Delhi'
    ]
    
    for query in test_queries:
        print(f'\n=== Testing query: "{query}" ===')
        try:
            recommendations, city, preferences = system.get_recommendations(query, num_recommendations=3)
            system.print_recommendations(recommendations, city, preferences)
        except Exception as e:
            print(f"Error processing query '{query}': {e}")
    
    print("\nTesting completed!")

if __name__ == "__main__":
=======
#!/usr/bin/env python3
"""
Test script for the Budget Recommendation System
"""

from budget_recommendation_system import MultiCityRecommendationSystem

def test_system():
    """Test the system with sample queries"""
    print("Testing Multi-City Recommendation System")
    print("=" * 50)
    
    # Initialize and load system
    system = MultiCityRecommendationSystem()
    system.load_and_preprocess_data()
    system.train_models()
    
    # Test queries with different cities and preferences
    test_queries = [
        'budget friendly restaurants',
        'cheap hotels',
        'best south indian food in Chennai',
        'luxury hotels in Mumbai',
        'biryani restaurants in Hyderabad',
        'budget restaurants in Banashankari',
        'premium dining in Delhi'
    ]
    
    for query in test_queries:
        print(f'\n=== Testing query: "{query}" ===')
        try:
            recommendations, city, preferences = system.get_recommendations(query, num_recommendations=3)
            system.print_recommendations(recommendations, city, preferences)
        except Exception as e:
            print(f"Error processing query '{query}': {e}")
    
    print("\nTesting completed!")

if __name__ == "__main__":
>>>>>>> 708c1ae66dcd2c85dcd39a822a0ef366099f4220
    test_system()