import './Button.css'

const Button = ({className, value, onClick, handleKeyDown}) => {
    return(
        <button className={className} onClick={onClick} onKeyPress={handleKeyDown}>
            {value}
        </button>
    );
}

export default Button;