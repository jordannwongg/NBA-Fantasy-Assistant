import requests
from bs4 import BeautifulSoup

def get_player_stats_for_season(year):
    URL = f"https://www.basketball-reference.com/leagues/NBA_{year}_per_game.html"
    response = requests.get(URL)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    players_stats = []
    for row in soup.find_all('tr', class_='full_table'):
        player_data = {}
        player_data['name'] = row.find('td', {'data-stat': 'player'}).text
        player_data['games'] = row.find('td', {'data-stat': 'g'}).text
        player_data['3s_made_per_game'] = row.find('td', {'data-stat': 'fg3_per_g'}).text
        player_data['rebounds_per_game'] = row.find('td', {'data-stat': 'trb_per_g'}).text
        player_data['assists_per_game'] = row.find('td', {'data-stat': 'ast_per_g'}).text
        player_data['steals_per_game'] = row.find('td', {'data-stat': 'stl_per_g'}).text
        player_data['blocks_per_game'] = row.find('td', {'data-stat': 'blk_per_g'}).text
        player_data['turnovers_per_game'] = row.find('td', {'data-stat': 'tov_per_g'}).text
        player_data['points_per_game'] = row.find('td', {'data-stat': 'pts_per_g'}).text
        
        players_stats.append(player_data)

    return players_stats
