import React, { useEffect, useState } from 'react';
import loginService from '../services/login';
import Alert from '../components/Alert';
import { useAuth } from '../context';
import { useLocation } from 'react-router-dom';

export default function LoginPage() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ fail, setFail ] = useState(false);
  const [ auth, handleAuth ] = useAuth();
  const location = useLocation();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.post(username, password);
      if (response.err !== undefined) {
        setFail(true);
      } else {
        setFail(false);
        console.log(response);
        handleAuth(response);
        //location.pathname = "/dashboard";
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      { fail ? <Alert content="Invalid username or password." /> : "" }
      <form onSubmit={handleLogin}>
        <div className="row mb-3 mt-3">
          <div className="col-auto">
            <label htmlFor="inputUsername" className="form-label">Username</label>
            <div className="input-group">
              <div className="input-group-text">@</div>
              <input 
                type="text" 
                className="form-control" 
                id="inputUsername" 
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="inputPassword" 
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}