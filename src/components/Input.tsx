import PropTypes, { InferProps } from 'prop-types';

function Input({ placeholder, value = '', onChange, error }: InferProps<typeof Input.propTypes>) {
  return (
    <div className='input'>
      <input
        className='input_field'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className='input_error'>{error}</p>
    </div>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default Input
