import React from 'react';


export default function Register() {
  return (
    <div className="container">
      <form>
        <div className="row mb-3 mt-3">
          <div className="col">
            <label for="inputUsername" className="form-label">Username</label>
            <div class="input-group">
              <div class="input-group-text">@</div>
              <input type="text" class="form-control" id="inputUsername" placeholder="john" />
            </div>
          </div>
          <div className="col">
            <label for="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="name@example.com"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

