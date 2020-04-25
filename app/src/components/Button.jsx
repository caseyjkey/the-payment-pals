import React from 'react';
import "./Button.css";

const STYLES = [
    "btn--primary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--primary--outline",
    "btn--warning--outline",
    "btn--danger--outline",
    "btn--success--outline",
];

const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {

    // Validates that the style passed in is in our list of styles. If not, default to "btn--primary--solid" (first element in our STYLES array)
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    // Validates that the size passed in is in our list of sizes. If not, default to "btn--medium" (first element in our SIZES array)
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};