import React, {type ReactNode} from 'react';
import styles from './styles.module.css';

/** Custom rounded checkbox with a little pop on toggle. */
export default function BubblyCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}): ReactNode {
  return (
    <label className={styles.check}>
      <input
        type="checkbox"
        className={styles.checkInput}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.checkBox} aria-hidden="true">
        <svg
          className={styles.checkMark}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className={styles.checkText}>{children}</span>
    </label>
  );
}
