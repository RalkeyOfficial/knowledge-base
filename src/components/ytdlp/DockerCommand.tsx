import React, {useState, type ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import {usePort, effectivePort} from './store';
import PortField from './PortField';
import BubblyCheckbox from './BubblyCheckbox';
import styles from './styles.module.css';

/**
 * Generates the `docker run` command for the bgutil POT provider. The chosen
 * port maps to the container's fixed 4416, and an optional restart policy makes
 * the container come back after a reboot.
 */
export default function DockerCommand(): ReactNode {
  const port = effectivePort(usePort());
  const [restart, setRestart] = useState(true);

  const restartFlag = restart ? ' --restart unless-stopped' : '';
  const command = `docker run --name bgutil-provider -d --init${restartFlag} -p ${port}:4416 brainicism/bgutil-ytdlp-pot-provider:deno --host 127.0.0.1`;

  return (
    <div className={styles.generator}>
      <div className={styles.controls}>
        <PortField />
        <BubblyCheckbox checked={restart} onChange={setRestart}>
          Auto-start on boot (<code>--restart unless-stopped</code>)
        </BubblyCheckbox>
      </div>
      <CodeBlock language="bash">{command}</CodeBlock>
    </div>
  );
}
