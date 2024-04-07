import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Example.css'; // Import your CSS file for styling
import { Nav, NavItem } from 'react-bootstrap'; // Import Nav, NavItem, and NavLink
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom


const tabs = [{
    route: "/home",
    icon: faHome,
    label: "Home"
}, {
    route: "/search",
    icon: faSearch,
    label: "Search"
}, {
    route: "/signup",
    icon: faUserCircle,
    label: "Signup"
}]

const Navigation = (props) => {
    return (
        <div>
            {/* Bottom Tab Navigator*/}
            <nav className="navbar fixed-bottom navbar-light bottom-tab-nav" role="navigation">
                <Nav className="w-100">
                    <div className=" d-flex flex-row justify-content-around w-100">
                        {
                            tabs.map((tab, index) => (
                                <NavItem key={`tab-${index}`}>
                                    <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                                        <div className="row d-flex flex-column justify-content-center align-items-center">
                                            <FontAwesomeIcon size="lg" icon={tab.icon} />
                                            <div className="bottom-tab-label">{tab.label}</div>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            ))
                        }
                    </div>
                </Nav>
            </nav>
        </div>
    )
};

export default Navigation;