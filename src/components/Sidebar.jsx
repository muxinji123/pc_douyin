import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-area">
        <h1 className="logo-text">
          <span className="logo-icon">🎵</span> TikTok
        </h1>
      </div>

      <div className="search-bar">
        <span className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.35-6.35q-.75.6-1.725.925T9.5 15.9q-2.675 0-4.537-1.862T3.1 9.5q0-2.675 1.863-4.537T9.5 3.1q2.675 0 4.538 1.863T15.9 9.5q0 1.05-.325 2.025T14.65 13.25L21 19.6zM9.5 14.9q2.25 0 3.825-1.575T14.9 9.5q0-2.25-1.575-3.825T9.5 4.1q-2.25 0-3.825 1.575T4.1 9.5q0 2.25 1.575 3.825T9.5 14.9"/></svg>
        </span>
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      
      <nav className="nav-menu">
        <a href="#" className="nav-item active">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20V9.5l7-5.288L19 9.5V20h-5.192v-6.384h-3.616V20z"/></svg>
          </span>
          <span className="label">For You</span>
        </a>
        <a href="#" className="nav-item">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.35-6.35q-.75.6-1.725.925T9.5 15.9q-2.675 0-4.537-1.862T3.1 9.5q0-2.675 1.863-4.537T9.5 3.1q2.675 0 4.538 1.863T15.9 9.5q0 1.05-.325 2.025T14.65 13.25L21 19.6zM9.5 14.9q2.25 0 3.825-1.575T14.9 9.5q0-2.25-1.575-3.825T9.5 4.1q-2.25 0-3.825 1.575T4.1 9.5q0 2.25 1.575 3.825T9.5 14.9"/></svg>
          </span>
          <span className="label">Explore</span>
        </a>
        <a href="#" className="nav-item">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2.596 18.616v-1.647q0-.696.36-1.197q.361-.5.971-.799q1.3-.621 2.583-.99q1.282-.367 3.086-.367t3.087.368t2.583.989q.609.298.97.799q.36.501.36 1.197v1.647zm16 0v-1.693q0-.87-.353-1.641q-.352-.772-.997-1.324q.737.15 1.42.416q.682.267 1.35.599q.65.327 1.019.834t.369 1.116v1.693zM7.473 10.508q-.877-.877-.877-2.123t.877-2.123t2.123-.877t2.123.877t.877 2.123t-.877 2.123t-2.123.877t-2.123-.877m8.516 0q-.877.877-2.123.877q-.064 0-.162-.015t-.162-.031q.502-.628.778-1.381q.276-.754.276-1.573q0-.82-.285-1.564q-.286-.744-.769-1.39q.081-.029.162-.038t.162-.008q1.246 0 2.123.877t.877 2.123t-.877 2.123"/></svg>
          </span>
          <span className="label">Following</span>
        </a>
        <a href="#" className="nav-item">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.45 0-6.012-2.288T3.127 13h1.011q.3 2.925 2.506 4.963T12 20t5.356-2.037t2.506-4.963h1.01q-.3 3.45-2.862 5.738T12 21"/></svg>
          </span>
          <span className="label">LIVE</span>
        </a>
        <a href="#" className="nav-item">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z"/></svg>
          </span>
          <span className="label">Upload</span>
        </a>
        <a href="#" className="nav-item">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.877 10.508Q9 9.63 9 8.385t.877-2.123T12 5.385t2.123.877T15 8.385t-.877 2.123t-2.123.877t-2.123-.877M5 18.616v-1.647q0-.619.36-1.158q.361-.54.97-.838q1.416-.679 2.834-1.018q1.417-.34 2.836-.34t2.837.34t2.832 1.018q.61.298.97.838q.361.539.361 1.158v1.647z"/></svg>
          </span>
          <span className="label">Profile</span>
        </a>
      </nav>

      <div className="login-prompt">
        <button className="primary-btn">Log in</button>
      </div>

      <div className="divider"></div>

      <div className="footer-links">
        <p>Company</p>
        <p>Program</p>
        <p>Terms & Policies</p>
        <p className="copyright">© 2026 TikTok</p>
      </div>
    </div>
  );
}

export default Sidebar;
