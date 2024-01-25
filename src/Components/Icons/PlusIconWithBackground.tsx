import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

type IconProps = {
    width?: number;
    height?: number;
    color?: string;
};

export const PlusIconWithBackground = ({
    width = 24,
    height = 24,
    color = '#051224',
}: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
            <Rect
                width="32"
                height="32"
                rx="12"
                fill={color}
                fillOpacity="0.04"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7501 10.3903C16.7501 9.97605 16.4143 9.64026 16.0001 9.64026C15.5858 9.64026 15.2501 9.97605 15.2501 10.3903V15.2502H10.3904C9.97617 15.2502 9.64038 15.586 9.64038 16.0002C9.64038 16.4144 9.97617 16.7502 10.3904 16.7502H15.2501V21.6097C15.2501 22.0239 15.5858 22.3597 16.0001 22.3597C16.4143 22.3597 16.7501 22.0239 16.7501 21.6097V16.7502H21.6098C22.024 16.7502 22.3598 16.4144 22.3598 16.0002C22.3598 15.586 22.024 15.2502 21.6098 15.2502H16.7501V10.3903Z"
                fill={color}
                fillOpacity="0.92"
            />
        </Svg>
    );
};
