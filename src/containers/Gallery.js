import { connect } from 'react-redux'
import Gallery from '../components/Gallery'
import { addImages } from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        images: state.images
    }
}

export default connect(mapStateToProps, null)(Gallery)