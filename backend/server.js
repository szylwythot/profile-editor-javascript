// let counter = 0;

const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
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

app.post('/upload', function(request, response) {
    let picture = request.files.picture;
    const answer = {};
    // let pictureName = `profile${counter}.jpg`;
    let pictureName = `profile.jpg`;
    if(picture){
        console.dir(picture);
        // fs.rmdir(dir, { recursive: true }, (err) => {
        //     if (err) {
        //         throw err;
        //     }
        
        //     console.log(`${dir} is deleted!`);
        // });
        // fs.unlinkSync(`${frondendPath}upload/${pictureName}`);
        // pictureName = `profile${counter++}.jpg`;
        picture.mv(`${frondendPath}upload/${pictureName}`); //${picture.name}`);
    }
    
    answer.pictureName = pictureName; //picture.name;
    console.log("start upload");
    console.log(request.files.picture);

    response.send(answer); // itt megy át a response a frontendre!
  });

const port = 9004;
const ipAddress = `http://127.0.0.4:${port}`
app.listen(port, () => {
    console.log(ipAddress)
});