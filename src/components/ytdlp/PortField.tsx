import React, {type ReactNode} from 'react';
import {usePort, setPort, DEFAULT_PORT} from './store';
import styles from './styles.module.css';

/**
 * Number input bound to the shared port store. Rendered in both the Docker and
 * config generators — editing it in either place updates the other.
 */
export default function PortField(): ReactNode {
  const raw = usePort();
  return (
    <label className={styles.field}>
      <span className={styles.label}>POT provider port</span>
      <input
        className={styles.input}
        type="number"
        min={1}
        max={65535}
        placeholder={String(DEFAULT_PORT)}
        value={Number.isFinite(raw) ? raw : ''}
        onChange={(e) =>
          setPort(e.target.value === '' ? NaN : Number(e.target.value))
        }
      />
    </label>
  );
}
