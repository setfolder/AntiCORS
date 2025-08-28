// Avoid CORS with local installed Node.js

// Server code (with installed Node.js, express, require) :
app.get(
    '/primer',
    function (request, response) {
        request.post(
            { url: 'https://mysite.com/test', form: {key: 'value'} },
            function (error, httpResponse, body) {
                console.log(body);
                response.json( JSON.parse(body) );
            }
        )
    }
);

// Browser code
let button = document.getElementById('test');
let res = document.getElementById('res');
button.addEventListener('click', function () {
    let xRequest = new XMLHttpRequest();
    xRequest.open('GET', 'http://localhost:3000/primer');
    xRequest.send();
    xRequest.addEventListener('readystatechange', function () {
        if (xRequest.readyState == 4 && xRequest.status == 200) {
            let data = JSON.parse(xRequest.response);
            console.log(data);
            res.innerHTML = data.token;
        }
    });
});