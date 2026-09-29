import { Link, Outlet } from 'react-router-dom'
import styles from './AppShell.module.scss'

/** The frame around every browsing page. The player leaves it behind for the whole screen. */
export const AppShell = () => (
  <div className={styles.shell}>
    <header className={styles.header}>
      <Link to="/" className={styles.wordmark}>
        weirwood
      </Link>
    </header>
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
)
