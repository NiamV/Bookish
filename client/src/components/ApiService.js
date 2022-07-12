export class ApiService {
  queryBooks() {
    return new Promise((resolve, reject) =>
      fetch("/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
        .then((response) => checkResponse(response))
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))

    );
  }

  // Title: Boolean - true if Title and false if Author
  searchBook(searchType, data) {
    let body = null
    if (searchType === 'title') {
      body = {"title": data}
    } else if (searchType === 'author') {
      body = {"author": data}
    } else {
      throw new Error("Invalid search type " + searchType)
    }

    return new Promise((resolve, reject) =>
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
        .catch((error) => reject(error))
    );
  }

  queryCopies(isbn) {
    return new Promise((resolve, reject) =>
    fetch("/book/copies", {
      method: "POST",
      body: JSON.stringify({isbn: isbn}),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
      .then((response) => checkResponse(response))
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error))
  );
  }

  createBook(title, author, isbn, numberCopies) {
    return new Promise((resolve, reject) =>
    fetch("/book/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        author: author,
        isbn: isbn,
        copies: numberCopies
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
      .then((response) => checkResponse(response))
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error))

    );
  }

  uploadFile(file) {
    let data = new FormData();
    data.append(file.name, file);
    return new Promise((resolve, reject) => {
      fetch("/books/upload", {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        },
      })
        .then((response) => checkResponse(response))
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))
  
    })
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

  user_create(name) {
    let body = {"name": name, "access_token": name}

    return new Promise((resolve) =>
      fetch("/user/create", {
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



const checkResponse = async (response) => {
  if (response.ok) {
    return response;
  }

  let json = await response.json();
  throw new Error(json.error);
};
