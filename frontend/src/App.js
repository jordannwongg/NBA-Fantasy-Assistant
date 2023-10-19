import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/stats/2023")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlayers(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>NBA Fantasy Assistant</h1>
      <Paper style={{ margin: '20px', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>3s Made</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Rebounds</TableCell>
              <TableCell>Assists</TableCell>
              <TableCell>Steals</TableCell>
              <TableCell>Blocks</TableCell>
              <TableCell>Turnovers</TableCell>
              <TableCell>Fantasy Points</TableCell>
              <TableCell>Total Fantasy Points</TableCell>
              {/* Add other columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.Rank}>
                <TableCell>{player.Rank}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.threes_made_per_game}</TableCell>
                <TableCell>{player.points_per_game}</TableCell>
                <TableCell>{player.rebounds_per_game}</TableCell>
                <TableCell>{player.assists_per_game}</TableCell>
                <TableCell>{player.steals_per_game}</TableCell>
                <TableCell>{player.blocks_per_game}</TableCell>
                <TableCell>{player.turnovers_per_game}</TableCell>
                <TableCell>{player.avg_fantasy_points}</TableCell>
                <TableCell>{player.total_fantasy_points}</TableCell>
                {/* Add other data cells as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default App;
