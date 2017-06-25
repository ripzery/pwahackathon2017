import { connect } from 'react-redux';
import Home from '../components/Home';
import { toggleConnectivity } from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        connected: state.connected
    };
};

const HomeContainer = connect(
    mapStateToProps,
    null
)(Home);

export default HomeContainer;