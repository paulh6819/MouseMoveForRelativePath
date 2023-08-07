const axios = require("axios");

const cheerio = require('cheerio');

axios.get('http://www.puppies.com', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537'
    }
})
    .then((response) => {

        const $ = cheerio.load(response.data)

        $('a').each((index, element) => {
            console.log($(element).attr("href"))
        })
    })
    .catch((error) => {
        console.log('could not do this', error);
    });











