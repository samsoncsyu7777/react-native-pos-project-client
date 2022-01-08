export async function getItem(token, upc) {
  const URL = process.env.URL + '/item/v1/get-upc/' + upc;
  
  return await fetch(URL, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  })
    .then((response) => response.json())
    .catch(() => ({
      errors: { message: 'Unable to connect to server. Please try again' },
    }));
}