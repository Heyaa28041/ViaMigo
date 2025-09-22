#!/usr/bin/env python3
"""
Quick Start Demo - Multi-City Recommendation System
==================================================
Run this to see the system in action with different types of queries.
"""

from budget_recommendation_system import MultiCityRecommendationSystem

def quick_demo():
    """Demonstrate system capabilities with various query types"""
    
    print("Multi-City Recommendation System - Quick Demo")
    print("=" * 60)
    
    # Initialize system
    print("Loading system...")
    system = MultiCityRecommendationSystem()
    system.load_and_preprocess_data()
    system.train_models()
    print("System ready!\n")
    
    # Demo queries showing different capabilities
    demo_queries = [
        {
            'query': 'budget friendly restaurants',
            'description': 'Basic budget restaurant search'
        },
        {
            'query': 'luxury hotels',
            'description': 'Premium hotel search'
        },
        {
            'query': 'south indian food',
            'description': 'Cuisine-specific search'
        },
        {
            'query': 'restaurants in Banashankari',
            'description': 'Location-specific search'
        },
        {
            'query': 'best rated places',
            'description': 'Quality-focused search'
        }
    ]
    
    for i, demo in enumerate(demo_queries, 1):
        print(f"Demo {i}: {demo['description']}")
        print(f"Query: \"{demo['query']}\"")
        print("-" * 40)
        
        try:
            recommendations, city, preferences = system.get_recommendations(demo['query'], num_recommendations=3)
            
            if recommendations:
                system.print_recommendations(recommendations, city, preferences)
            else:
                print("No results found for this query.")
            
        except Exception as e:
            print(f"Error: {e}")
        
        print("\n" + "=" * 60 + "\n")
    
    print("Demo completed!")
    print("\nTo use the system interactively, run:")
    print("python budget_recommendation_system.py")

if __name__ == "__main__":
    quick_demo()