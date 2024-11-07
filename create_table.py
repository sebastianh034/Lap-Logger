import sqlite3
import os

DB_PATH = os.path.join('DB', 'times.db')

def create_table():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS times (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                value TEXT NOT NULL
            )
        ''')
        print("Table 'times' created successfully.")

if __name__ == '__main__':
    create_table()
