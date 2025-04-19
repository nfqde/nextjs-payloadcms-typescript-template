import type {Variants} from 'motion/react';

export const LayoutTransition: Variants = {
    enter: {opacity: 1},
    exit: {opacity: 0},
    initial: {opacity: 0}
};