

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



window.onload = function () {
    fetch('/generate-image')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.imageUrl;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "Generated Image";
            document.body.appendChild(imgElement);
        })
        .catch(error => {
            console.error('Error fetching the image:', error);
        });
}

