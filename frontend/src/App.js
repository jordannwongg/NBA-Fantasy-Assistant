import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

function App() {
  const [players, setPlayers] = useState([]);
  const [year, setYear] = useState(null);

  useEffect(() => {
    const fetchURL = "http://127.0.0.1:5000/2023";
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlayers(data);
        const extractedYear = fetchURL.split('/').pop();
        setYear(extractedYear);
      });
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px'
  };

  const tableContainerStyle = {
    maxHeight: '90vh',
    overflow: 'auto',
  };

  return (
    <div className="App" style={containerStyle}>
      <h1 style={titleStyle}>
        {`${parseInt(year) - 1}-${year} NBA Fantasy Assistant`}
      </h1>
      <Paper>
        <div style={tableContainerStyle}>
          <Table stickyHeader>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}

export default App;
