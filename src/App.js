import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TodayIcon from '@material-ui/icons/Today';
import TimelineIcon from '@material-ui/icons/Timeline';
import MoodIcon from '@material-ui/icons/Mood';
import YourDay from './YourDay.js';
import Data from './Data.js';
import GoodTimes from './GoodTimes.js';

function Nav(props) {
  return (
    <BottomNavigation 
      showLabels 
      value={props.location.pathname} 
      onChange={(event, newValue) => {
        props.history.push(newValue);
      }}
    >
      <BottomNavigationAction label="Your Day" icon={<TodayIcon />} value="/" />
      <BottomNavigationAction label="Data" icon={<TimelineIcon />} value="/data/" />
      <BottomNavigationAction label="Good Times" icon={<MoodIcon />} value="/good-times/" />
    </BottomNavigation>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box height="100%" display="flex" flexDirection="column">
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6">Mental Cycle</Typography>
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={YourDay} />
        <Route path="/data/" component={Data} />
        <Route path="/good-times/" component={GoodTimes} />
        <Box
          position="fixed"
          bottom={0}
          width="100%"
        >
          <Route children={Nav} />
        </Box>
        <Box visibility="hidden">
          <Route children={Nav} />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
