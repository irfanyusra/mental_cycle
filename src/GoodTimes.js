import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { keys, get } from 'idb-keyval';

class GoodTimes extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };

    let k;

    keys().then(keys => {
      k = keys;
      return Promise.all(keys.map(key => get(key)));
    }).then(data => {
      for (const [idx, datum] of data.entries()) {
        datum.date = k[idx];
      }

      data = data.filter(datum => datum.rating == 4);

      this.setState({
        data
      });
    });
  }
  render() {
    const state = this.state;

    return (
      <Box flexGrow={1} px={2} pb={2}>
        {state.data.map(datum => {
          const emoji = ['😭', '😢', '😐', '😊', '🤩'][datum.rating];

          return (
            <Box pt={2}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {emoji + ' ' + datum.date}
                  </Typography>
                  <Typography variant="p">
                    {datum.reason}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    );
  }
}

export default GoodTimes;
