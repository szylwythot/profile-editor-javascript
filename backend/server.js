const errorHTML = `
		
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com"> 
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
    <style>
        body{
            padding: 0; margin: 0;
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            background-color: #4343F9;
            color: #fff;
        }
        #root{
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 21px;
        }
    </style>
    <title>Not here</title>
</head>
<body>
    <div id="root">Rise your gaze to the sky<br/>than a bit back to the URL bar<br/>and check that link again</div>
</body>
</html>

`;

const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

function getFunction(request, response){
  response.sendFile(
    path.join(`${__dirname}/../frontend/index.html`));
}

app.use(fileUpload());

app.get("/", getFunction);
app.use("/pub", express.static(`${__dirname}/../frontend/public`));
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));

console.log("start");

const uploads = path.join(`${__dirname}/../frontend/upload/`);

app.post('/', function(request, response) {
    let picture = request.files.picture;
    const answer = {};
    if(picture){
        console.dir(picture);
        picture.mv(`${uploads}profile.jpg`); //${picture.name}`);
    }
    
    answer.pictureName = "profile.jpg"; //picture.name;
    console.log("start upload");
    console.log(request.files.picture);

    response.send(answer); // itt megy át a response a frontendre!
  });

const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`
app.listen(port, () => {
    console.log(ipAddress)
});