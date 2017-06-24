import { connect } from 'react-redux';
import { addImages, toggleDialog } from '../actions'
import Add from '../components/Add';

const mapStateToProps = (state, ownProps) => ({
    upload_dialog_opened: state.upload_dialog_opened
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addImages: (images) => {
            dispatch(addImages(images))
        },
        toggleDialog: () => {
            dispatch(toggleDialog())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)