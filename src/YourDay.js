import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { get, set, keys } from 'idb-keyval';

class YourDay extends React.Component {
  constructor(props) {
    super(props);

    const today = (new Date()).toJSON().slice(0,10);

    this.state = {
      rating: null,
      reason: "",
      logged: false,
    };

    get(today).then(val => {
      if (val !== undefined) {
        this.setState(val);
        this.setState({
          logged: true,
        });
      }
    });

    keys().then(keys => {
      if (keys.length === 0) {
        set('2019-09-07', { rating: 3, reason: "A chill day spent reading" });
        set('2019-09-08', { rating: 4, reason: "Great birthday fun with friends" });
        set('2019-09-09', { rating: 2, reason: "Had to attend a boring presentation" });
        set('2019-09-10', { rating: 3, reason: "Went to see a movie in Toronto" });
        set('2019-09-11', { rating: 2, reason: "Uneventful day" });
        set('2019-09-12', { rating: 1, reason: "A bunch of regrets came back to haunt me" });
        set('2019-09-13', { rating: 2, reason: "Start of HTN, tiring" });
        set('2019-09-14', { rating: 3, reason: "Gaining momentum at HTN" });
      }
    });
  }

  render() {
    const state = this.state;

    return !state.logged ? (
      <Box 
        flexGrow={1} 
        display="flex" 
        flexDirection="column" 
        justifyContent="center"
      >
        <Box p={2}>
          <Typography variant="h5">
            How was your day?
          </Typography>
          <Box pt={2} pb={4} display="flex" justifyContent="space-between">
            <Button 
              variant="outlined"
              color={state.rating === 0 ? "primary" : null}
              onClick={() => {
                this.setState({
                  rating: 0,
                });
              }}
            >
              <Typography variant="h6">
                😭
              </Typography>
            </Button>
            <Button 
              variant="outlined"
              color={state.rating === 1 ? "primary" : null}
              onClick={() => {
                this.setState({
                  rating: 1,
                });
              }}
            >
              <Typography variant="h6">
                😢
              </Typography>
            </Button>
            <Button 
              variant="outlined"
              color={state.rating === 2 ? "primary" : null}
              onClick={() => {
                this.setState({
                  rating: 2,
                });
              }}
            >
              <Typography variant="h6">
                😐
              </Typography>
            </Button>
            <Button 
              variant="outlined"
              color={state.rating === 3 ? "primary" : null}
              onClick={() => {
                this.setState({
                  rating: 3,
                });
              }}
            >
              <Typography variant="h6">
                😊
              </Typography>
            </Button>
            <Button 
              variant="outlined"
              color={state.rating === 4 ? "primary" : null}
              onClick={() => {
                this.setState({
                  rating: 4,
                });
              }}
            >
              <Typography variant="h6">
                🤩
              </Typography>
            </Button>
          </Box>
          <Typography variant="h5">
            Why?
          </Typography>
          <Box pt={1} >
            <TextField 
              fullWidth
              multiline
              rowsMax={4}
              value={state.reason}
              onChange={event => {
                this.setState({
                  reason: event.target.value,
                });
              }}
            />
          </Box>
          <Box pt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => {
                const today = (new Date()).toJSON().slice(0,10);
                set(today, {
                  rating: state.rating,
                  reason: state.reason,
                }).then(() => {
                  this.setState({
                    logged: true,
                  });
                });
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    ) : (
      <Box 
        flexGrow={1} 
        p={2}
        display="flex" 
        flexDirection="column" 
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h1">
          <CheckCircleIcon fontSize="inherit" />
        </Typography>
        <Typography variant="h5">
          You've logged for today!
        </Typography>
      </Box>
    );
  }
}

export default YourDay;
