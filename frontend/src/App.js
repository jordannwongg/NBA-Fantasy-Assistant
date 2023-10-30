import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

function NBAFantasyAssistant() {
  const [players, setPlayers] = useState([]);
  const [sortKey, setSortKey] = useState(null); 
  const [sortDirection, setSortDirection] = useState('asc'); 
  const { year } = useParams();

  useEffect(() => {
    const fetchURL = `http://127.0.0.1:5000/${year}`;
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlayers(data);
      });
  }, [year]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prevDirection) => (prevDirection === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortKey) {
      if (sortDirection === 'desc') {
        return b[sortKey] - a[sortKey];
      } else {
        return a[sortKey] - b[sortKey];
      }
    }
    return 0; 
  });

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: 'Playfair'
  };

  const tableContainerStyle = {
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const activeColumnStyle = {
    cursor: 'pointer',
    color: 'blue'
  };

  const getColumnStyle = (key) => sortKey === key ? activeColumnStyle : { cursor: 'pointer' };

  const getSortedSymbol = (key) => {
    if (sortKey === key) {
      return sortDirection === 'desc' ? ' ⬇' : ' ⬆';
    }
    return '';
  };

  return (
    <div className="App" style={containerStyle}>
      <h1 style={titleStyle}>
       {`Fantasy Basketball '${(parseInt(year) - 1).toString().slice(-2)}-'${year.slice(-2)} Rankings`}
      </h1>
      <Paper>
        <div style={tableContainerStyle}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell style={getColumnStyle('games')} onClick={() => handleSort('games')}>Games{getSortedSymbol('games')}</TableCell>
                <TableCell style={getColumnStyle('threes_made_per_game')} onClick={() => handleSort('threes_made_per_game')}>3s Made{getSortedSymbol('threes_made_per_game')}</TableCell>
                <TableCell style={getColumnStyle('points_per_game')} onClick={() => handleSort('points_per_game')}>Points{getSortedSymbol('points_per_game')}</TableCell>
                <TableCell style={getColumnStyle('rebounds_per_game')} onClick={() => handleSort('rebounds_per_game')}>Rebounds{getSortedSymbol('rebounds_per_game')}</TableCell>
                <TableCell style={getColumnStyle('assists_per_game')} onClick={() => handleSort('assists_per_game')}>Assists{getSortedSymbol('assists_per_game')}</TableCell>
                <TableCell style={getColumnStyle('steals_per_game')} onClick={() => handleSort('steals_per_game')}>Steals{getSortedSymbol('steals_per_game')}</TableCell>
                <TableCell style={getColumnStyle('blocks_per_game')} onClick={() => handleSort('blocks_per_game')}>Blocks{getSortedSymbol('blocks_per_game')}</TableCell>
                <TableCell style={getColumnStyle('turnovers_per_game')} onClick={() => handleSort('turnovers_per_game')}>Turnovers{getSortedSymbol('turnovers_per_game')}</TableCell>
                <TableCell style={getColumnStyle('avg_fantasy_points')} onClick={() => handleSort('avg_fantasy_points')}>Fantasy Points{getSortedSymbol('avg_fantasy_points')}</TableCell>
                <TableCell style={getColumnStyle('total_fantasy_points')} onClick={() => handleSort('total_fantasy_points')}>Total Fantasy Points{getSortedSymbol('total_fantasy_points')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPlayers.map((player) => (
                <TableRow key={player.Rank}>
                  <TableCell>{player.Rank}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.games}</TableCell>
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

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/:year" element={<NBAFantasyAssistant />} />
       <Route path="/" element={<Navigate to="/2023" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
