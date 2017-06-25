import { connect } from 'react-redux';
import Notification from '../components/Notification';
import { showNotification, hideNotification } from '../actions';

const mapStateToProps = (state, ownProps) => {
    return state.notification
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideNotification: () => {
            dispatch(hideNotification())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);
