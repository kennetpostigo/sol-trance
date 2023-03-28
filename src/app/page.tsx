import { ConnectAndSend } from './ConnectAndSend';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <ConnectAndSend />
    </main>
  );
}
