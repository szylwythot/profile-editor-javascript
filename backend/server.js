const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

const frondendPath = path.join(`${__dirname}/../frontend/`);

function getFunction(request, response){
  response.sendFile(`${frondendPath}index.html`);
}

app.use(fileUpload());

app.get("/", getFunction);
app.use("/pub", express.static(`${__dirname}/../frontend/public`));
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));

console.log("start");

// const uploads = path.join(`${__dirname}/../frontend/upload/`);

app.post('/upload', function(request, response) {
    let picture = request.files.picture;
    console.log(picture);
    // const answer = {};
    // if(picture){
    //     console.dir(picture);
    //     picture.mv(`${uploads}profile.jpg`); //${picture.name}`);
    // }
    
    // answer.pictureName = "profile.jpg"; //picture.name;
    // console.log("start upload");
    // console.log(request.files.picture);

    // response.send(answer); // itt megy át a response a frontendre!
  });

const port = 9004;
const ipAddress = `http://127.0.0.4:${port}`
app.listen(port, () => {
    console.log(ipAddress)
});