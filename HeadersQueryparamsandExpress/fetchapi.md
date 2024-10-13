# Fetch API

There are two `high level` ways a browser can send requests to an HTTP server:

![Fetch API Overview](/HeadersQueryparamsandExpress//fetch%20api.png)

1. **From the browser URL (Default GET request):**
   - When you type a URL into the browser’s address bar and press Enter, the browser sends an HTTP GET request to the server. This request is used to retrieve resources like HTML pages, images, or other content.

2. **From an HTML form or JavaScript (Various request types):**
   - **HTML Forms:** When a user submits a form on a webpage, the browser sends an HTTP request based on the form’s `method` attribute, which can be `GET` or `POST`. Forms with `method="POST"` typically send data to the server for processing (e.g., form submissions).
   - **JavaScript (Fetch API):** JavaScript running in the browser can make HTTP requests to a server using APIs like the `fetch` API. These requests can be of various types (`GET`, `POST`, `PUT`, `DELETE`, etc.) and are commonly used for asynchronous data retrieval and manipulation (e.g., AJAX requests).
