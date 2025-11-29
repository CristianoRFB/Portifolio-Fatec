"use client";

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

type Props = MotionProps & { children?: React.ReactNode };

export function MotionDiv(props: Props) {
  const { children, ...rest } = props;
  return <motion.div {...rest}>{children}</motion.div>;
}
