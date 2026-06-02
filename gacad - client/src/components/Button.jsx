import { Link } from 'react-router-dom'

const variantClasses = {
    // Primary: Deep Corporate Navy background with Gold text accent
    primary: 'bg-[#002147] text-[#FFD100] hover:bg-[#001530] hover:text-white',
    // Secondary: Gold background with Deep Navy text accent
    secondary: 'bg-[#FFD100] text-[#002147] hover:bg-[#e6bd00]',
};

const Button = ({
    children,
    to,
    type = 'button',
    variant = 'secondary',
    className = '',
}) => {
    const classes = [
        // Retained your exact structure, mapping the border to your primary Deep Navy tone
        'inline-flex items-center justify-center rounded-full border-2 border-[#002147] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition',
        variantClasses[variant] ?? variantClasses.secondary,
        className,
    ]
    .join(' ')
    .trim();

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes}>
            {children}
        </button>
    );
};

export default Button;