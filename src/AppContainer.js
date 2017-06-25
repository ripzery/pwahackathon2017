import { connect } from 'react-redux';
import App from './App';
import { toggleConnectivity } from './actions';

const mapStateToProps = (state, ownProps) => ({
  connected: state.connected
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleConnectivity: (connected) => {
      dispatch(toggleConnectivity(connected))
    }
  };
};
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;