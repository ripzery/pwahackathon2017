import { connect } from 'react-redux';
import Authentication from '../components/Authentication';
import { signInWithGoogle, signOut } from '../actions';

const mapDispatchToProps = (dispatch) => {
    return {
        signInWithGoogle: (user) => {
            dispatch(signInWithGoogle(user))
        },
        signOut: () => {
            dispatch(signOut())
        }
    };
};
export default connect(
    null,
    mapDispatchToProps
)(Authentication);