def calculate_fantasy_score(player):
    # Weights for each category
    weights = {
        'points_per_game': 1,
        'rebounds_per_game': 1,
        'assists_per_game': 2,
        'steals_per_game': 4,
        'blocks_per_game': 4,
        'threes_made_per_game': 1,
        'turnovers_per_game': -2,
        'field_goal_made_per_game': 2,
        'field_goal_attempts_per_game': -1,
        'free_throw_made_per_game': 1,
        'free_throw_attempts_per_game': -1
    }

    total_score = 0
    for category, weight in weights.items():
        total_score += player[category] * weight * player['games']

    avg_score = total_score / player['games'] if player['games'] != 0 else 0

    return avg_score, total_score