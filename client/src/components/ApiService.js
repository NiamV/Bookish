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
  book(searchType, data) {
    let body = null
    if (searchType === 'title') {
      body = {"title": data}
    } else if (searchType === 'author') {
      body = {"author": data}
    } else {
      throw new Error("Invalid search type " + searchType)
    }

    return new Promise((resolve) =>
      fetch("/book", {
        method: "POST",
        body: JSON.stringify(body),
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

  user(id) {
      let body = {"user": id}

      return new Promise((resolve) =>
          fetch("/user", {
              method: "POST",
              body: JSON.stringify(body),
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

  isUser(id) {
      let body = {"user": id}

      return new Promise((resolve) =>
          fetch("/user/isUser", {
              method: "POST",
              body: JSON.stringify(body),
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

  user_assign(id, copy_id, due_date) {
    let body = {"id": id, "copy_id": copy_id, "due_date": due_date}

    return new Promise((resolve) =>
      fetch("/user/assign", {
        method: "POST",
        body: JSON.stringify(body),
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
  if (response.ok) {
    return response;
  }
  return response.text().then((e) => {
    throw new Error(e);
  });
};
