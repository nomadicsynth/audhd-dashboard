import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Paper, Typography, LinearProgress, Button, TextField } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const TaskCard = ({ title, status, energy, time }) => (
  <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Status: {status}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Energy: {energy}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Time: {time}
    </Typography>
  </Paper>
);

function App() {
  const [tasks, setTasks] = useState([
    { title: 'Eat Pea & Ham Soup', status: 'Not Started', energy: 'Medium', time: '15 min' },
    { title: 'Read a chapter', status: 'In Progress', energy: 'Low', time: '30 min' },
    { title: 'Water plants', status: 'Not Started', energy: 'Low', time: '5 min' },
    { title: 'Respond to email', status: 'Not Started', energy: 'High', time: '20 min' },
  ]);

  const [spoons, setSpoons] = useState(10);
  const maxSpoons = 15;

  const [command, setCommand] = useState('');

  const handleCommandChange = (event) => {
    setCommand(event.target.value);
  };

  const handleCommandSubmit = (event) => {
    event.preventDefault();
    processCommand(command);
    setCommand('');
  };

  const processCommand = (cmd) => {
    // Simple command processing logic
    if (cmd.toLowerCase().startsWith('add task')) {
      const newTask = {
        title: cmd.slice(9).trim(),
        status: 'Not Started',
        energy: 'Medium',
        time: '30 min'
      };
      setTasks([...tasks, newTask]);
    } else if (cmd.toLowerCase() === 'list tasks') {
      console.log(tasks);  // For now, just log to console
    } else {
      console.log('Command not recognized');
    }
    // In the future, this is where we'd integrate with an LLM for more complex processing
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          AuDHD-Friendly Dashboard
        </Typography>
        
        {/* Natural Language Interface */}
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <form onSubmit={handleCommandSubmit}>
            <TextField
              fullWidth
              label="Enter a command"
              variant="outlined"
              value={command}
              onChange={handleCommandChange}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Execute
            </Button>
          </form>
        </Paper>
        
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Energy Meter (Spoons)
          </Typography>
          <Typography variant="body1">
            {spoons} / {maxSpoons} spoons
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(spoons / maxSpoons) * 100} 
            sx={{ mt: 1, mb: 1 }}
          />
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Today's Focus
            </Typography>
            {tasks.map((task, index) => (
              <TaskCard key={index} {...task} />
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Quick Wins
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="body1">
                • Take a 5-minute break
              </Typography>
              <Typography variant="body1">
                • Drink a glass of water
              </Typography>
              <Typography variant="body1">
                • Do a quick stretch
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Sensory Check-In
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="body1" gutterBottom>
                How are you feeling right now?
              </Typography>
              {['😊', '😐', '😖', '😴', '🤯'].map((emoji, index) => (
                <Button key={index} variant="outlined" sx={{ mr: 1, mb: 1 }}>
                  {emoji}
                </Button>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;