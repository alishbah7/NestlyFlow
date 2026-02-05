"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './CustomFilterDropdown.css';

interface DropdownOption {
    value: string;
    label: string;
    isGroup?: boolean; // Indicates if this is an optgroup label
}

interface CustomFilterDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const CustomFilterDropdown: React.FC<CustomFilterDropdownProps> = ({ options, value, onChange, placeholder = "Select Filter" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedOptionLabel = options.find(opt => opt.value === value)?.label || placeholder;

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <button type="button" className={`dropdown-toggle ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
                <span>{selectedOptionLabel}</span>
                <ChevronDown size={20} />
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option, index) => (
                        option.isGroup ? (
                            <li key={index} className="dropdown-group-label">
                                {option.label}
                            </li>
                        ) : (
                            <li
                                key={option.value}
                                className={`dropdown-item ${option.value === value ? 'selected' : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </li>
                        )
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomFilterDropdown;
