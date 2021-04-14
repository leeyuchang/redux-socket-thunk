import './App.css';
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {initializeSocket, socketConnectionClosed} from "./redux/socket";

function App(props) {
  useEffect(() => {
    const {dispatch} = props
    dispatch(initializeSocket())
    return () => dispatch(socketConnectionClosed())
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        {props.socket.connected ? <div>Connected!</div> : <div>Connecting...</div>}
      </header>
    </div>
  );
}

export default connect((state) => ({
  socket: state.socket
}), (dispatch) => ({
  dispatch: dispatch
}))(App);
