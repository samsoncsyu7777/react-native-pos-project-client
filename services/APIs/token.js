export async function getClientToken(tokenRequestVO) {
  const URL = process.env.URL + '/api/v1/token';
  
  return await fetch(URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenRequestVO),
  })
    .then((response) => response.json())
    .catch(() => ({
      errors: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function getUserToken(token, tokenRequestVO) {
  const URL = process.env.URL + '/api/v1/user/access';
  
  return await fetch(URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(tokenRequestVO),
  })
    .then((response) => response.json())
    .catch(() => ({
      errors: { message: 'Unable to connect to server. Please try again' },
    }));
}