import sqlite3

def create_table(year):
    conn = sqlite3.connect('nba_stats.db')
    cursor = conn.cursor()

    # Dynamic table name based on year
    table_name = "players_" + str(year)
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS {} (
        id INTEGER PRIMARY KEY,
        name TEXT,
        games INTEGER,
        field_goal_made_per_game REAL,
        field_goal_attempts_per_game REAL,
        free_throw_made_per_game REAL,
        free_throw_attempts_per_game REAL,
        threes_made_per_game REAL,
        rebounds_per_game REAL,
        assists_per_game REAL,
        steals_per_game REAL,
        blocks_per_game REAL,
        turnovers_per_game REAL,
        points_per_game REAL
    )
    ''' .format(table_name))

    conn.commit()
    conn.close()

def insert_player_stats(stats, year):
    conn = sqlite3.connect('nba_stats.db')
    cursor = conn.cursor()

    # Dynamic table name based on year
    table_name = f"players_{year}"
    # Clear table before inserting new data
    cursor.execute(f'DELETE FROM {table_name}')
    
    for player in stats:
        cursor.execute('''
        INSERT INTO {} (name, games, field_goal_made_per_game, field_goal_attempts_per_game, free_throw_made_per_game, free_throw_attempts_per_game, threes_made_per_game, rebounds_per_game, assists_per_game, steals_per_game, blocks_per_game, turnovers_per_game, points_per_game)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        '''.format(table_name), (player['name'], player['games'], player['field_goal_made_per_game'], player['field_goal_attempts_per_game'], player['free_throw_made_per_game'], player['free_throw_attempts_per_game'], player['3s_made_per_game'], player['rebounds_per_game'], player['assists_per_game'], player['steals_per_game'], player['blocks_per_game'], player['turnovers_per_game'], player['points_per_game']))

    conn.commit()
    conn.close()
