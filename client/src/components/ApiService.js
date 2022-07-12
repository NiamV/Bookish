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
}



const checkResponse = async (response) => {
  if (response.ok) {
    return response;
  }

  let json = await response.json();
  throw new Error(json.error);
};
