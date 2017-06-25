import { connect } from 'react-redux';
import SubscribeDialog from '../components/SubscribeDialog';
import { showNotification, toggleSubscribeDialog } from '../actions';

const mapDispatchToProps = (dispatch) => {
    return {
        showNotification: (message, isError = false, isDialog = true) => {
            dispatch(showNotification(message))
        },
        toggleSubscribeDialog: () => {
            dispatch(toggleSubscribeDialog())
        }
    };
};
const SubscribeDialogContainer = connect(
    null,
    mapDispatchToProps
)(SubscribeDialog);

export default SubscribeDialogContainer;