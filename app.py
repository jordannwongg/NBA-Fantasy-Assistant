from flask import Flask
import sqlite3
import pandas as pd
from calculate import calculate_fantasy_score


app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to NBA Fantasy Assistant! \
        An application made with the purpose of helping users with NBA Fantasy picks! \
        Made by Jordan Wong :D Navigate to /stats/{input year}"

@app.route('/stats/<int:year>')
def get_stats(year):
    conn = sqlite3.connect('nba_stats.db')
    query = f"SELECT * FROM players_{year}"
    df = pd.read_sql_query(query, conn)
    conn.close()

    # Calculate fantasy scores and add to dataframe
    df['avg_fantasy_score'], df['total_fantasy_score'] = zip(*df.apply(calculate_fantasy_score, axis=1))
    df = df.sort_values(by='total_fantasy_score', ascending=False)
    
    df.drop(columns=['id'], inplace=True)
    df['Rank'] = range(1, len(df) + 1)

    # Reorder the columns to have Rank first
    columns_order = ['Rank'] + [col for col in df if col != 'Rank']
    df = df[columns_order]
    
    return df.to_html(index=False)

if __name__ == "__main__":
    app.run(debug=True)
