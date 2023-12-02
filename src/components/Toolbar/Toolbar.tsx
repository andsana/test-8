import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Quotes Central</span>
        <ul className="navbar-nav mr-auto flex-row gap-2">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Quotes</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add-quote" className="nav-link">Submit new quote</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;