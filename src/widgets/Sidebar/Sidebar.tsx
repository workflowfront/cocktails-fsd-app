import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { COCKTAIL_CODES } from '@shared/constants/cocktails';

const Sidebar: React.FC = memo(() => (
  <nav className={styles.sidebar}>
    <ul className={styles.menuList}>
      {COCKTAIL_CODES.map((code) => (
        <li className={styles.menuItem} key={code}>
          <NavLink
            to={`/${code}`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            end
          >
            {code.charAt(0).toUpperCase() + code.slice(1)}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
));

Sidebar.displayName = 'Sidebar';

export default Sidebar;
