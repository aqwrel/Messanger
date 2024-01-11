import PropTypes, { InferProps } from 'prop-types';

function Avatar({initials}: InferProps<typeof Avatar.propTypes>) {
    return (
        <div className='avatar'>
            {initials}
        </div>
    )
}

Avatar.propTypes = {
    initials: PropTypes.string.isRequired,
};

export default Avatar
