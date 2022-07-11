export class ApiService {
  healthCheck() {
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
        .catch((error) => console.error(error))

    );
  }

  books() {
    return new Promise((resolve) =>
      fetch("/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
        .then((response) => checkResponse(response))
        .then((response) => resolve(response.json()))
        .catch((error) => console.error(error))

    );
  }

  // Title: Boolean - true if Title and false if Author
  book(title, data) {
    return new Promise((resolve) =>
      fetch("/book", {
        method: "POST",
        body: JSON.stringify({title: data}),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
        .then((response) => checkResponse(response))
        .then((response) => resolve(response.json()))
        .catch((error) => console.error(error))

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
