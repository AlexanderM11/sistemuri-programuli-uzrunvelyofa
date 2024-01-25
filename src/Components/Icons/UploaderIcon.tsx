import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

type iconProps = {
    width?: number;
    height?: number;
    color?: string;
};

export const UploaderIcon = ({
    width = 32,
    height = 32,
    color = '#051224',
}: iconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
            <Rect
                width={width}
                height={height}
                rx="12"
                fill={color}
                fillOpacity="0.04"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2701 13.5567C9.23758 13.8342 7.66675 15.5583 7.66675 17.6667C7.66675 19.9675 9.53258 21.8333 11.8334 21.8333H21.0001C22.8409 21.8333 24.3334 20.3408 24.3334 18.5C24.3334 16.6592 22.8409 15.1667 21.0001 15.1667C21.0001 12.405 18.7617 10.1667 16.0001 10.1667C13.8026 10.1667 11.9409 11.5858 11.2701 13.5567Z"
                fill={color}
            />
            <Path
                d="M14.1943 16.5558L16.0002 14.75L17.806 16.5558"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M16.0002 18.9167V14.75"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
