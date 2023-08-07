const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 4001;

// Middleware
app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());

let fetch; // Declare fetch here.

// Dynamically import node-fetch
import('node-fetch').then(fetchedModule => {
    fetch = fetchedModule.default;

    // Example endpoint - you can uncomment if needed
    // app.get("/", (req, res) => {
    //     res.send("<h1>Hello world </h1>")
    // });

    app.post("/ask-openai", (req, res) => {
        // Note: Never hard-code API keys in the code.
        // Consider using environment variables or some secure mechanism.
        const apiKey = 'Bearer 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';

        fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: 'How do I drive from michigan to california? Respond like you are Hunter S. Thombson who had way to much coffee',
                max_tokens: 150
            })
        })
            .then(response => response.json())
            .then(data => {
                const text = data.choices && data.choices[0] && data.choices[0].text || "No data found!";
                res.json({ answer: text });
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).send('Error occurred.');
            });
    });

    app.listen(port, () => {
        console.log(`server running at localhost:${port}`);
    });

}).catch(error => {
    console.error("Failed to load node-fetch:", error);
});




// To achieve this functionality, you'll need to do the following:

// Frontend: Create an HTML page with an input box and a submit button.
// Frontend: Use JavaScript to capture the input and send it to your server (backend) when the submit button is clicked.
// Backend: In your Express server, create an endpoint to receive the input and then forward it to the OpenAI API with the required modifications.
// Frontend: Display the response from OpenAI on your webpage.
// Here's a step-by-step guide to help you accomplish this:

// 1. Frontend: HTML Page
// Create a basic HTML page with an input field and a button.

// html
// Copy code
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>OpenAI with Hunter S. Thompson</title>
// </head>
// <body>
//     <input type="text" id="userInput" placeholder="Enter your question">
//     <button onclick="submitQuestion()">Submit</button>
//     <div id="response"></div>

//     <script src="script.js"></script> <!-- Your JavaScript file -->
// </body>
// </html>
// 2. Frontend: JavaScript
// In the script.js file:

// javascript
// Copy code
// function submitQuestion() {
//     const inputVal = document.getElementById('userInput').value;
//     fetch('/ask-openai', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ question: inputVal }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('response').innerText = data.answer;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }
// 3. Backend: Express Server
// In your existing Express server, add an endpoint to handle the frontend request:

// javascript
// Copy code
// app.use(express.json()); // To handle JSON input from frontend

// app.post('/ask-openai', (req, res) => {
//     const userQuestion = req.body.question;
//     const prompt = `PROMPT NOW RESPOND AS IF YOU ARE HUNTER S THOMPSON WHO HAD WAY TOO MUCH COFFEE: ${userQuestion}`;

//     fetch('https://api.openai.com/v1/engines/davinci/completions', {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Bearer YOUR_OPENAI_KEY',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             prompt: prompt,
//             max_tokens: 150,
//         }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         const answer = data.choices && data.choices[0] && data.choices[0].text || "No response found!";
//         res.json({ answer: answer.trim() }); // Send the response back to frontend
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         res.status(500).send('Error occurred.');
//     });
// });