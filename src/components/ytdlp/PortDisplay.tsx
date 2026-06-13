import React, {type ReactNode} from 'react';
import {usePort, effectivePort} from './store';
import styles from './styles.module.css';

/**
 * Read-only view of the shared port. Used in step 5 so the value can't be
 * edited independently of step 2 (which would silently desync the config from
 * the running container).
 */
export default function PortDisplay(): ReactNode {
  const port = effectivePort(usePort());
  return (
    <div className={styles.field}>
      <span className={styles.label}>POT provider port</span>
      <div className={styles.portChip} title="Set in step 2 — kept in sync">
        <span>{port}</span>
        <span className={styles.portChipNote}>synced from step 2</span>
      </div>
    </div>
  );
}
