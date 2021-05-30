import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nav from './components/Nav';
import Footer from './components/Footer';
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
