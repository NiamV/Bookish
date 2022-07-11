export class ApiService{
    example(): Promise<Response> {
        return new Promise((resolve) =>
            fetch("/localhost:5000/healthcheck", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => checkResponse(response))
                .then((response) => resolve(response.json()))
                .catch((error) => alert(error))
        );
    }
}

const checkResponse = (response: Response) => {
    if(response.ok) {
        return response;
    }
    return response.text().then((e) => {
            throw new Error(e)
        }
    )
}