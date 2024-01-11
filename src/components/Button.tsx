import PropTypes, { InferProps } from 'prop-types';

function Button({title, onClick}: InferProps<typeof Button.propTypes>) {
    return (
        <button className='btn' onClick={onClick}>
            {title}
        </button>
    )
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Button
