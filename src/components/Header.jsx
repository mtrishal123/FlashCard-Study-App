import '../styles/Header.css';

function Header({ username, onLogout }) {
    return (
      <div className="dashboard-header">
        <h2>Welcome, {username}!</h2>
        <button onClick={onLogout} className="logout-button">
        <img src="./logout.svg" alt="Logout Icon" className="logout-icon" />
            
        </button>
      </div>
    );
}
  
export default Header;
  