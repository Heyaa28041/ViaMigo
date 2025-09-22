#!/usr/bin/env python3
"""
Demo script for Budget Recommendation System
This demonstrates exactly what happens when a user types "budget friendly restaurants" or "hotels"
"""

from budget_recommendation_system import MultiCityRecommendationSystem

def demo():
    """Demo the system with user-like queries"""
    print("Multi-City Recommendation System Demo")
    print("=" * 50)
    
    # Initialize system
    print("Initializing system...")
    system = MultiCityRecommendationSystem()
    system.load_and_preprocess_data()
    system.train_models()
    
    print("\nSystem ready!")
    print("\n" + "="*50)
    print("DEMO: Multi-city recommendations with user preferences")
    print("="*50)
    
    # Simulate user queries with different cities and preferences
    user_queries = [
        "budget friendly restaurants",
        "best biryani in Hyderabad", 
        "luxury hotels in Mumbai",
        "south indian food in Chennai",
        "budget food in Banashankari",
        "premium dining in Delhi"
    ]
    
    for query in user_queries:
        print(f"\nUser types: '{query}'")
        print("System responds:")
        print("-" * 30)
        
        # Get recommendations
        recommendations, city, preferences = system.get_recommendations(query, num_recommendations=3)
        system.print_recommendations(recommendations, city, preferences)
        
        print("\n" + "="*50)

def quick_search(query):
    """Quick search function for specific queries"""
    system = MultiCityRecommendationSystem()
    system.load_and_preprocess_data()
    system.train_models()
    
    print(f"Searching for: '{query}'")
    recommendations, city, preferences = system.get_recommendations(query)
    system.print_recommendations(recommendations, city, preferences)

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        # If command line argument provided, use it as search query
        query = " ".join(sys.argv[1:])
        quick_search(query)
    else:
        # Run full demo
        demo()