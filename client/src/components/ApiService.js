export class ApiService {
  healthcheck() {
    return new Promise((resolve) =>
      fetch("/healthcheck", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
        .then((response) => checkResponse(response))
        .then((response) => resolve(response.json()))
        .catch((error) => alert(error))
    );
  }
}

const checkResponse = (response) => {
  console.log(response)
  
  if (response.ok) {
    return response;
  }

  return response.text().then((e) => {
    throw new Error(e);
  });
};
