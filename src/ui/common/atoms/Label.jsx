import React from "react";
import RequiredSign from "./RequiredSign";
const Label = ({
    name,
    label,
    required = false,
    textColor = "text-[#222222]",
    textSize = 'text-md',
    fontSize = 'font-medium'
}) => {
    return (
        <label
            htmlFor={name}
            className={` block ${textSize} ${textColor} ${fontSize} mb-2`}
        >
            {label} {required && <RequiredSign />}
        </label>
    );
};

export default Label;
