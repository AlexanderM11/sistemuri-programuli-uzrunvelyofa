import React from 'react';
import { Svg, Path } from 'react-native-svg';

type IconProps = {
    width?: number;
    height?: number;
    color?: string;
    fillOpacity?: string;
};

export const GaleryIcon = ({
    width = 36,
    height = 36,
    color = '#FF592B',
    fillOpacity = '0.04',
}: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 32 33" fill="none">
            <Path
                d="M0 8.5C0 4.08172 3.58172 0.5 8 0.5H24C28.4183 0.5 32 4.08172 32 8.5V24.5C32 28.9183 28.4183 32.5 24 32.5H12C5.37258 32.5 0 27.1274 0 20.5V8.5Z"
                fill={color}
                fillOpacity={fillOpacity}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 22.5H12C10.8953 22.5 10 21.6047 10 20.5V12.5C10 11.3953 10.8953 10.5 12 10.5H20C21.1047 10.5 22 11.3953 22 12.5V20.5C22 21.6047 21.1047 22.5 20 22.5Z"
                fill={color}
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M10 20.1573L13.0747 17.0827C13.3353 16.822 13.7573 16.822 14.0173 17.0827L14.9547 18.02L18.006 14.9693C18.2667 14.7087 18.6887 14.7087 18.9487 14.9693L22 18.0207"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M13.6769 13.4379C13.7745 13.5355 13.7745 13.6938 13.6769 13.7914C13.5792 13.8891 13.4209 13.8891 13.3233 13.7914C13.2257 13.6938 13.2257 13.5355 13.3233 13.4379C13.4209 13.3403 13.5792 13.3403 13.6769 13.4379"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
