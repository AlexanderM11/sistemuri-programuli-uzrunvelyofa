import React from 'react';
import { Svg, Path } from 'react-native-svg';

type IconProps = {
    width?: number;
    height?: number;
    color?: string;
};

export const DropdownCompleteIcon = ({
    width = 16,
    height = 17,
    color = '#00A566',
}: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 16 17" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5Z"
                fill={color}
                fillOpacity="0.92"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7 7.3455C10.8953 7.15023 10.8953 6.83365 10.7 6.63839C10.5047 6.44313 10.1881 6.44313 9.99288 6.63839L7.43451 9.19676L6.04093 7.80318C5.84567 7.60792 5.52909 7.60792 5.33382 7.80318C5.13856 7.99844 5.13856 8.31503 5.33382 8.51029L7.08097 10.2574C7.27623 10.4527 7.59282 10.4527 7.78808 10.2574C7.78911 10.2564 7.79014 10.2554 7.79116 10.2543L10.7 7.3455Z"
                fill="#EBF8F3"
            />
        </Svg>
    );
};
