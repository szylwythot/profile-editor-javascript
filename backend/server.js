// let counter = 0;

const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();

const frondendPath = path.join(`${__dirname}/../frontend`);
const backendPath = path.join(`${__dirname}/../backend`);
const profileJson = `${backendPath}/data/profile.json`;

app.use(fileUpload());

app.get("/", (request, response) => response.sendFile(`${frondendPath}/index.html`));

app.use("/pub", express.static(`${frondendPath}/public`));
app.use("/upload", express.static(`${frondendPath}/upload`));
app.use('/profile', express.static(profileJson));

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
        // fs.unlinkSync(`${frondendPath}/upload/${pictureName}`);
        // pictureName = `profile${counter++}.jpg`;
        picture.mv(`${frondendPath}/upload/${pictureName}`); //${picture.name}`);
    }
    
    answer.pictureName = pictureName; //picture.name;
    console.log("start upload");
    console.log(request.files.picture);

    response.send(answer); 
});

app.post('/save', function(request, response) {
    console.log("got request save");
    let profileData = JSON.stringify(request.body);
    console.log(profileData);

    fs.writeFile(profileJson, profileData, error => {
        if(error) {
            console.log(error);
            res.send("Error profile.json file.");
        }
    });

    response.send({"saved": true});
});

app.delete('/profile/', function(request, response) {
    console.log("got request save");
    // let profileData = JSON.stringify(request.body);
    // console.log(profileData);
    
    // let entries = Object.entries(profileData).map(data=>data='');
    // console.log("entries" + entries);


    fs.writeFile(profileJson, "{}", error => {
        if(error) {
            console.log(error);
            res.send("Error profile.json file.");
        }
    });

    response.send({"deleted": true});
});



const port = 9004;
const ipAddress = `http://127.0.0.4:${port}`
app.listen(port, () => {
    console.log(ipAddress)
});