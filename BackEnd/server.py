from flask import Flask, request
import sqlite3

app = Flask(__name__)

# Path to the SQLite database
DATABASE = 'DB/times.db'

def init_db():
    """Initialize the database schema."""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS times (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                track TEXT NOT NULL,
                car TEXT NOT NULL,
                time TEXT NOT NULL,
                number TEXT,
                top_speed TEXT,
                comments TEXT
            )
        ''')
        conn.commit()

@app.route('/save-data', methods=['POST'])
def save_data():
    """Endpoint to save data from the client."""
    data = request.get_json()

    # Validate required fields
    required_fields = ['track', 'car', 'time']
    for field in required_fields:
        if field not in data or not data[field]:
            return {'error': f'Missing required field: {field}'}, 400

    # Insert data into the database
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO times (name, track, car, time, number, top_speed, comments) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('name', ''),
            data['track'],
            data['car'],
            data['time'],
            data.get('number', ''),
            data.get('top_speed', ''),
            data.get('comments', '')
        ))
        conn.commit()

    return {'message': 'Data saved successfully!'}, 200

@app.route('/get-data', methods=['GET'])
def get_data():
    """Endpoint to retrieve all saved race times."""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM times')
        rows = cursor.fetchall()

    # Format the rows as a list of dictionaries
    times_data = []
    for row in rows:
        times_data.append({
            'id': row[0],
            'name': row[1],
            'track': row[2],
            'car': row[3],
            'time': row[4],
            'number': row[5],
            'top_speed': row[6],
            'comments': row[7]
        })

    return {'times': times_data}, 200

@app.route('/update-data/<int:id>', methods=['PUT'])
def update_data(id):
    """Endpoint to update a specific record in the database."""
    data = request.get_json()
    print(f"Received data for update: {data}")  # Debugging line

    # Check required fields for update
    required_fields = ['track', 'car', 'time']
    for field in required_fields:
        if field not in data or not data[field]:
            return {'error': f'Missing required field: {field}'}, 400

    # Update the record in the database
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE times
            SET name = ?, track = ?, car = ?, time = ?, number = ?, top_speed = ?, comments = ?
            WHERE id = ?
        ''', (
            data.get('name', ''),
            data['track'],
            data['car'],
            data['time'],
            data.get('number', ''),
            data.get('top_speed', ''),
            data.get('comments', ''),
            id
        ))
        conn.commit()

    print("Database updated successfully.")  # Confirmation message
    return {'message': 'Data updated successfully!'}, 200


@app.route('/delete-data/<int:id>', methods=['DELETE'])
def delete_data(id):
    """Endpoint to delete a specific record from the database."""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM times WHERE id = ?', (id,))
        conn.commit()
        
        if cursor.rowcount == 0:
            return {'error': 'Record not found'}, 404

    return {'message': 'Data deleted successfully!'}, 200

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow all origins
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')  # Allow specific headers
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')  # Allow specific methods
    return response

if __name__ == '__main__':
    init_db()  # Initialize the database
    app.run(port=5000, host='0.0.0.0')


