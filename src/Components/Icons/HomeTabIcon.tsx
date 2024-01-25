
import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';
import { colors } from '../../../src/Theme';

type IconProps = {
    width?: number;
    height?: number;
    color?: string;
};

export const HomeTabIcon = ({
    width = 24,
    height = 24,
    color = colors.invert5,
}: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path opacity="0.25" d="M9.31662 4.65932C10.422 2.44753 13.5783 2.44755 14.6837 4.65934L20.6805 16.6586C21.6774 18.6533 20.2269 20.9998 17.997 20.9998H6.00314C3.77322 20.9998 2.32272 18.6533 3.31962 16.6586L9.31662 4.65932Z" fill={color} />
            <Path d="M12 8C11.4477 8 11 8.44772 11 9V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V9C13 8.44772 12.5523 8 12 8Z" fill={color} />
            <Path d="M12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15Z" fill={color} />
        </Svg>
    );
};


