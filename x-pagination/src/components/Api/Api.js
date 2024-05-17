const API = {
    BASE_URL: "https://jsonplaceholder.typicode.com",
    get: (url) => fetch(`${API.BASE_URL}${url}`).then(res => res.json())
}