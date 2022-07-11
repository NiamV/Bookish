export class ApiService {
  example() {
    return new Promise((resolve) =>
      fetch("/healthcheck", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => checkResponse(response))
        .then((response) => resolve(response.json()))
        .catch((error) => alert(error))

    );
  }
}

const checkResponse = (response) => {
  if (response.ok) {
    console.log(response)
    return response;
  }
  return response.text().then((e) => {
    throw new Error(e);
  });
};
