

// function submitQuestion(){}




// const inputVal = document.getElementById('userInput').value;


function submitQuestion() {
    const inputVal = document.getElementById('userInput').value;
    fetch('/ask-openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputVal }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerText = data.answer;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
