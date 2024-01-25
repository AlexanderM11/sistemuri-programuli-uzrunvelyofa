import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

type IconProps = {
    width?: number;
    height?: number;
    color?: string;
};

export const SearchIcon = ({
    width = 26,
    height = 26,
    color = '#051224',
}: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 26 26" fill="none">
            <Circle
                cx="12.0588"
                cy="12.0586"
                r="7.06194"
                stroke={color}
                stroke-opacity="0.92"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M21.0034 21.0033L17.0518 17.0517"
                stroke={color}
                stroke-opacity="0.92"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
