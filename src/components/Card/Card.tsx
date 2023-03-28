import React from 'react';
import cx from 'classnames';
import styles from './Card.module.css';

export interface Card extends React.PropsWithChildren {
  size: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Card: React.FC<Card> = ({ size, className, children }) => {
  return <div className={cx(styles.card, className)}>{children}</div>;
};
