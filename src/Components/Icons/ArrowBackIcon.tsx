import React from 'react';
import { Svg, Rect, Path } from 'react-native-svg';
import { colors } from '../../../src/Theme';

type IconProps = {
    width?: number;
    height?: number;
    color?: string;
};

export const ArrowBackIcon = ({
    width = 36,
    height = 36,
    color = colors.invert5,
}: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
            <Rect
                width="36"
                height="36"
                rx="12"
                fill={color}
                fill-opacity="0.04"
            />
            <Path
                d="M20 14L16 18L20 22"
                stroke={colors.blackMain}
                stroke-opacity="0.92"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
