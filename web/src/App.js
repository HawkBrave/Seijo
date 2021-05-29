import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nav from './components/Nav';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

export default function App() {
  const links = [
    { name: "Register", path: "/register", page: <RegisterPage /> },
    { name: "Login", path: "/login", page: <LoginPage /> },
  ]
  return (
    <Router>
      <Nav links={links} />
      <Switch>
        {
          links.map(link => 
            <Route path={link.path}>
              {link.page}
            </Route>
          )
        }
      </Switch>
    </Router>
  );
}
