import React from 'react';
import { Icon } from '@iconify/react';

type IconProps = {
    icon: string;
    hflip?: boolean;
    vflip?: boolean;
    color?: string;
    size?: string;
};

const Icons: React.FC<IconProps> = ({ icon, hflip, vflip, color, size }) => {
    return (
        <Icon
            icon={icon}
            hFlip={hflip}
            vFlip={vflip}
            color={color}
            fontSize={size}
        />
    );
};

export default Icons;
