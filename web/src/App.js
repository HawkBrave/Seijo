import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React, { useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import UserPage from './pages/user';
import DashboardPage from './pages/dashboard';
import { useAuth } from './context';

export default function App() {
  const [ auth, handleAuth ] = useAuth();
  const [ links, setLinks ] = useState([
    { name: "Dashboard", path: "/dashboard", page: <DashboardPage /> },
    { name: "Register", path: "/register", page: <RegisterPage /> },
    { name: "Login", path: "/login", page: <LoginPage /> },
  ]);

  if (auth.authenticated) {
    setLinks([
      { name: auth.username, path: `u/${auth.username}`, page: <UserPage />}
    ]);
  }

  return (
    <Router>
        <Nav links={links} />
        <main className="flex-shrink-0">
          <Switch>
            {
              links.map((link, index) => 
                <Route key={index} path={link.path}>
                  {link.page}
                </Route>
              )
            }
          </Switch>
        </main>
        <Footer />
    </Router>
  );
}
