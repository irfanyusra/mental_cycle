import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { keys, get } from 'idb-keyval';
import { ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

class Data extends React.Component {
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

      this.setState({
        data
      });
    });
  }
  render() {
    const state = this.state;

    return (
      <Box flexGrow={1} p={2}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={state.data}>
            <CartesianGrid strokeDasharray="5 5" />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
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
    )
  }
}

export default Data;
