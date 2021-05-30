const baseUrl = '/api/users';

async function getAll() {
  const data = await fetch(baseUrl);
  const json = await data.json();
  return json;
}

async function get(id) {
  const data = await fetch(`${baseUrl}/${id}`);
  const json = await data.json();
  return json;
}

async function post(username, email, password) {
  const data = await fetch(baseUrl, {
    method: 'POST',
    header: 'Content-Type: application/json',
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
  const json = await data.json();
  return json;
}

const usersService = {
  post
};

export default usersService;