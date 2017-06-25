import { connect } from 'react-redux';
import SubscribeDialog from '../components/SubscribeDialog';
import { showNotification } from '../actions';

const mapDispatchToProps = (dispatch) => {
    return {
        showNotification: (message, isError = false, isDialog = true) => {
            dispatch(showNotification(message))
        }
    };
};
const SubscribeDialogContainer = connect(
    null,
    mapDispatchToProps
)(SubscribeDialog);

export default SubscribeDialogContainer;