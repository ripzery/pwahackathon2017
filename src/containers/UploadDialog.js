import { connect } from 'react-redux';
import { addImages, toggleDialog, clearImages } from '../actions'
import UploadDialog from '../components/UploadDialog';

const mapStateToProps = (state, ownProps) => {
    return {
        images: state.images,
        upload_dialog_opened: state.upload_dialog_opened,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        upload: (images) => {
            dispatch(addImages(images))
        },
        closeDialog: () => {
            dispatch(toggleDialog())
        },
        clearImages: () => {
            dispatch(clearImages())
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadDialog);