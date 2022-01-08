export async function changePassword(newPassword, token) {
  const URL = process.env.URL + '/api/v1/user/change-passkey';

  return await fetch(URL, {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ passkey: newPassword }),
  })
    .then((response) => response.json())
    .catch(() => ({
      errors: { message: 'Unable to connect to server. Please try again' },
    }));
}