import React, { useState } from 'react';
import Users from '../services/users';


export default function Register() {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await Users.post(username, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <div className="row mb-3 mt-3">
          <div className="col">
            <label htmlFor="inputUsername" className="form-label">Username</label>
            <div className="input-group">
              <div className="input-group-text">@</div>
              <input 
                type="text" 
                className="form-control" 
                id="inputUsername" 
                placeholder="john" 
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
          </div>
          <div className="col">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="inputEmail" 
              aria-describedby="emailHelp" 
              placeholder="name@example.com"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="exampleInputPassword1" 
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

