import sqlite3

# Path to the SQLite database
DATABASE = 'DB/times.db'

# Example data to insert
example_data = [
    ('John Doe', 'Silverstone', 'Ferrari F8', '01:45:23', 23, 211.0, 'Great performance on the straights!'),
    ('Jane Smith', 'Monaco', 'McLaren 720S', '01:42:30', 7, 205.0, 'Amazing handling through the corners.'),
    ('Michael Johnson', 'Daytona', 'Dodge Challenger', '01:50:15', 88, 200.0, 'Needs improvement on the turns.'),
    ('Sarah Connor', 'Spa-Francorchamps', 'Porsche 911 GT3', '01:40:05', 12, 210.0, 'Best lap of the day!'),
    ('Bruce Wayne', 'Nürburgring', 'Audi R8', '01:37:45', 99, 205.0, 'Fantastic performance under pressure.')
]

# Function to insert example data into the database
def insert_data():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.executemany('''
            INSERT INTO times (name, track, car, time, number, top_speed, comments) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', example_data)
        conn.commit()
        print("Example data inserted successfully!")

# Run the insert function
if __name__ == '__main__':
    insert_data()
