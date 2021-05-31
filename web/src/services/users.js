const baseUrl = 'http://localhost:3000/api/users';

async function getAll() {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
}

async function get(id) {
  const response = await fetch(`${baseUrl}/${id}`);
  const data = await response.json();
  return data;
}

async function post(username, email, password) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
  const data = await response.json();
  return data;
}

const usersService = {
  getAll,
  get,
  post,
};

export default usersService;