import { connect } from 'react-redux';
import Authentication from '../components/Authentication';
import { signInWithGoogle, signOut, showNotification } from '../actions';

const mapStateToProps = (state, ownProps) => ({
    connected: state.connected
});

const mapDispatchToProps = (dispatch) => {
    return {
        signInWithGoogle: (user) => {
            dispatch(signInWithGoogle(user))
        },
        signOut: () => {
            dispatch(signOut())
        },
        showNotification: (message) => {
            dispatch(showNotification(message))
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Authentication);