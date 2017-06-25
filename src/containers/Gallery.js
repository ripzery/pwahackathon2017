import { connect } from 'react-redux'
import Gallery from '../components/Gallery'
import { addImages,showNotification,toggleDialog,toggleSubscribeDialog } from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        images: state.images
    }
}

const mapDispatchToProps = (dispatch) => ({
    showNotification: (message, isError) => {
        dispatch(showNotification(message, isError));
    },
    toggleDialog: () => {
        dispatch(toggleDialog())
    },
    toggleSubscribeDialog: () => {
        dispatch(toggleSubscribeDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)