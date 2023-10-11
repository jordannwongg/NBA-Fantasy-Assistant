from flask import Flask
import sqlite3
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to NBA Fantasy Assistant! \
        An application made with the purpose of helping users with NBA Fantasy picks! \
        Made by Jordan Wong :D"

@app.route('/stats/<int:year>')
def get_stats(year):
    conn = sqlite3.connect('nba_stats.db')
    query = f"SELECT * FROM players_{year}"
    df = pd.read_sql_query(query, conn)
    conn.close()

    return df.to_html()

if __name__ == "__main__":
    app.run(debug=True)
