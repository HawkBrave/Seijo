const baseUrl = 'http://localhost:3000/login';

async function post(username, password) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  const data = await response.json();
  return data;
}

const loginService = {
  post
}

export default loginService;