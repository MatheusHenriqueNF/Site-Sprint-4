"use client";
import React, { useState } from "react";

type InputProps = {
    placeholder?: string;
    corTexto?: string;
    label?: string;
    name: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
    placeholder = "Digite o texto",
    corTexto = "#3B48EF",
    label = "Label",
    name,
    type = "text",
    value,
    onChange,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative w-full">
            <label
                className={`absolute left-4 mt-[-8] bg-white transition-all duration-200 pointer-events-none ${
                    isFocused || value ? "top-0 text-xs opacity-100" : "opacity-0"
                }`}
                style={{ color: corTexto }}
            >
                {label}
            </label>
            <input
                className="w-full h-15 px-4  border border-[#3B48EF] rounded-2xl"
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{ color: corTexto, backgroundColor: "white" }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default Input;
