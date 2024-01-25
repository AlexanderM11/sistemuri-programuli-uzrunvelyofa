import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

type IconProps = {
    width?: number;
    height?: number;
    color?: string;
};

export const HeaderAccountIcon = ({
    width = 38,
    height = 41,
    color = '#FF5433',
}: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 38 41" fill="none">
            <Path
                d="M0 8.5C0 4.08172 3.58172 0.5 8 0.5H30C34.4183 0.5 38 4.08172 38 8.5V32.5C38 36.9183 34.4183 40.5 30 40.5H12C5.37258 40.5 0 35.1274 0 28.5V8.5Z"
                fill={color}
                fillOpacity="0.08"
            />
            <Circle
                cx="19"
                cy="20.5"
                r="9"
                fill="#FF592B"
                stroke="#FF592B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14.5 24.5C14.8969 23.5894 15.7956 23.0005 16.7889 23H21.2111C22.2044 23.0005 23.1031 23.5894 23.5 24.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Circle
                cx="19"
                cy="18"
                r="2.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
