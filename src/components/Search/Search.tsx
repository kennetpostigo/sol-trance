'use client';
import React from 'react';
import cx from 'classnames';
import * as Select from '@radix-ui/react-select';

import styles from './Search.module.css';

export const Search = () => {
  return (
    <nav className={styles.search}>
      <Select.Root>
        <Select.Trigger className={styles.selectTrigger} aria-label="Food">
          <Select.Value placeholder="" className={styles.hidden}/>
          <input placeholder="search for transactions" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={styles.selectContent}
            side="bottom"
            sideOffset={10}
            alignOffset={10}
          >
            <Select.Viewport className={styles.selectViewport}>
              <Select.Item className={cx(styles.selectItem)} value="one">
                <Select.ItemText>One</Select.ItemText>
              </Select.Item>

              <Select.Item className={cx(styles.selectItem)} value="two">
                <Select.ItemText>Two</Select.ItemText>
              </Select.Item>

              <Select.Item className={cx(styles.selectItem)} value="three">
                <Select.ItemText>Three</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </nav>
  );
};
