import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'
// socket
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/createPalette';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import {amber, red, blue} from 'material-ui/colors';
import {socketUrl} from './config.js';
const muiTheme = createMuiTheme({
	palette: createPalette({
		primary: blue,
		accent: amber,
		error: red,
		type: 'light'
	})
})

const socket = io.connect(socketUrl);
ReactDOM.render(
  <Provider store={store}>
		<MuiThemeProvider theme={muiTheme}>
			<SocketProvider socket={socket}>
      	<App />
			</SocketProvider>
		</MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
