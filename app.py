from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
import pandas as pd
from calculate import calculate_fantasy_points


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Welcome to NBA Fantasy Assistant! \
        An application made with the purpose of helping users with NBA Fantasy picks! \
        Made by Jordan Wong :D Add and navigate /stats/2023 to your url!"

@app.route('/stats/<int:year>')
def get_stats(year):
    conn = sqlite3.connect('nba_stats.db')
    query = f"SELECT * FROM players_{year}"
    df = pd.read_sql_query(query, conn)
    conn.close()

    # Calculate fantasy scores and add to dataframe
    df['avg_fantasy_points'], df['total_fantasy_points'] = zip(*df.apply(calculate_fantasy_points, axis=1))
    df['avg_fantasy_points'] = df['avg_fantasy_points'].round(1)
    df['total_fantasy_points'] = df['total_fantasy_points'].round()
    df = df.sort_values(by='total_fantasy_points', ascending=False)
    
    df.drop(columns=['id'], inplace=True)
    df['Rank'] = range(1, len(df) + 1)

    # Reorder the columns to have Rank first
    columns_order = ['Rank'] + [col for col in df if col != 'Rank']
    df = df[columns_order]
    
    return jsonify(df.to_dict(orient='records'))

if __name__ == "__main__":
    app.run(debug=True, port=5000)
