from flask import Flask, request, jsonify
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '../Model'))

# Import your ML model function, replace with your actual function name
from budget_recommendation_system import predict_itinerary  # Example

app = Flask(__name__)

@app.route('/api/itinerary', methods=['POST'])
def get_itinerary():
    data = request.json
    try:
        # Call your ML prediction function with the incoming data
        itinerary = predict_itinerary(data)
        return jsonify({'itinerary': itinerary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
