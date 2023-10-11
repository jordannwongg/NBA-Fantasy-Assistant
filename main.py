import scraper
import database

def main():
    current_season = 2024
    last_season = current_season - 1

    # Create tables
    database.create_table(current_season)
    database.create_table(last_season)

    # Fetch player stats
    current_season_stats = scraper.get_player_stats_for_season(current_season)
    last_season_stats = scraper.get_player_stats_for_season(last_season)

    # Insert stats into the database
    database.insert_player_stats(current_season_stats, current_season)
    database.insert_player_stats(last_season_stats, last_season)

    print("Data scraping and insertion complete!")

if __name__ == "__main__":
    main()
