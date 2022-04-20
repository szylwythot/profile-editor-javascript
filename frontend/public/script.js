let rootElement;

// helping functions
function makeCapital(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

class TextData {
    constructor(title, label, placeholder, value) { // todo: remove parameters, and refact
        this.title = title;
        this.label = label;
        this.placeholder = placeholder;
        this.value = value;
    }

    textInput() {
        return `
            <div class="${this.title} input-data">
                <p>
                    <label for="${this.title}">${this.label}</label>
                </p>
                <input type="text" placeholder="${this.placeholder}" id="${this.title}" name="${this.title}" value="${this.value}">
            </div>
        `;
    };
}

const personalInputs = (profileData) => {
    let {firstName, lastName, streetAddress, zipCode, cityTown, countryState} = profileData;

    if((Array.isArray(profileData) && profileData.length === 0) || profileData === undefined || profileData === null ){
        [firstName, lastName, streetAddress, zipCode, cityTown, countryState] = ["", "", "", "", "", ""];
    }

    return [
        new TextData("firstName", "First name", "First name", firstName),
        new TextData("lastName", "Last name", "Last name", lastName),
        new TextData("streetAddress", "Street address", "Street address", streetAddress),
        new TextData("zipCode", "Zip code", "Zip code", zipCode),
        new TextData("cityTown", "City / town", "City / town", cityTown),
        new TextData("countryState", "Country / state", "Country / state", countryState)
    ];
}

const personalInputDataHtml = (profileData) => {
    let profileDataTextObjects = personalInputs(profileData);
    return profileDataTextObjects.map((data) => data.textInput()).join("");
}

const leftContent = (profileData) => {
    return `
    <div class="left-content">
        <h1>Profile editor</h1>
        ${contentBox("introduction", textareaContent, profileData, "", "")}
    </div>
    `;
}

const rightContent = (profileData) => {
    return contentBox("personal", personalInputDataHtml, profileData, "right-content", profilePhoto());
}

const contentBox = (contentTitle, inputDataFun, profileData, additionalClassName, additionalHtml) => {
    return `
    <div class="${contentTitle}-box content-box ${additionalClassName}">
        <div class="cover">
            <h2>${makeCapital(contentTitle)}</h2>
        </div>
        <div class="${contentTitle}-data-container input-data-container">
            ${inputDataFun(profileData, contentTitle)}
        </div>
        ${additionalHtml}
    </div>
    `;

}

const profilePhoto = function () {
    return `
    <div class="profile-photo">
        <img src="/pub/images/profiles/profile.jpg" class="profile-photo-img">
        <label for="profile-photo" class="profile-photo-label">
            <i class="fa fa-cloud-upload"></i> Change profile photo
        </label>
        <input id="profile-photo" type="file"/>
        </div>
        `;
    }

const textareaContent = (profileData, contentTitle) => {
    let introduction = profileData === {} ? "" : profileData.introduction;
    return `
    <div class="${contentTitle} input-data">
        <p>
            <label for="${contentTitle}">${makeCapital(contentTitle)}</label>
        </p>
        <!-- rows="10" cols="50" -->
        <textarea  maxlength="150" name="${contentTitle}" form="profile-form" id="${contentTitle}">${introduction}</textarea>
    </div>
    `;
}

// eventhandlers
async function photoChangeEventHandler(event){
    const imageInput = event.target;
    // const imageFile = imageInput.files[0];

     // create formdata
     const formData = new FormData();
     formData.append(`picture`, imageInput.files[0]); 

     const fetchSettings = {
         method : `POST`,
         body : formData
     };

    fetch(`/upload`, fetchSettings)
    .then( async (data) => {
        if (data.status == 200) {
            // event.target.outerHTML = "Done";

            const response = await data.json();
            console.dir(data);
            const img = document.querySelector(".profile-photo-img");
            // console.log(img);
            img.src = `upload/${response.pictureName}`;
            // img.remove();
            // const photoDiv = imageInput.parentNode;
            // console.log(photoDiv);
            // photoDiv.insertAdjacentHTML(`afterbegin`, `<img src="upload/${response.pictureName}" class="profile-photo-img">`)
            
            // event.target.outerHTML = `
            // <img src="upload/${response.pictureName}">
            // `;
            // console.dir(data);
            // ${response.pictureName}
        }
    })
    .catch(error => {
        event.target.outerHTML = `Error`;
        console.dir(error);
    });
}

async function deleteClickedEventHandler(event){
    const response = await getData("profile", "delete");

    if(response.deleted === true) {
        const formElement = document.getElementById("profile-form");
        formElement.remove();
        const profileData = [];
        rootElement.insertAdjacentHTML(`afterbegin`, formHtml(profileData));
        
        const fileUpload = document.getElementById("profile-photo");
        fileUpload.addEventListener(`change`, photoChangeEventHandler);
    }
}

async function saveClickedEventHandler(event){
    const formElement = document.getElementById("profile-form");
    console.log(formElement);
    
    // create formdata
    let formData = new FormData(formElement);
    const fetchSettings = {
        method : `POST`,
        body : formData
    };

    fetch(`/save`, fetchSettings)
    .then( async (data) => {
        if (data.status == 200) {
            // event.target.outerHTML = "Done";

            const response = await data.json();
            if(response.saved === true){
                formElement.remove();
                const profileData = await getData('/profile');
                rootElement.insertAdjacentHTML(`afterbegin`, formHtml(profileData));
                const fileUpload = document.getElementById("profile-photo");
                fileUpload.addEventListener(`change`, photoChangeEventHandler);
            }
        }
    })
    .catch(error => {
        event.target.outerHTML = `Error`;
        console.dir(error);
    });
}

const formHtml = (profileData) =>{
    return `
        <form action="" id="profile-form">
            ${rightContent(profileData)}
            ${leftContent(profileData)}
        </form>
    `;
};

const innerHtml = (profileData) => { return `
    ${formHtml(profileData)}
    <div class="action-buttons">
        <button class="delete">Delete</button>
        <button class="save">Save</button>
        <!-- <input type="submit" value="Save"> -->
    </div>
    `
};

// FETCH URL - RETURN JSON
const getData = async (url, method = "get") => {
    const request = await fetch(url, {method: method});
    const result = await request.json();
    return result;
};

async function loadEvent(){
    rootElement = document.getElementById("root");
    
    // fetch data
    const profileData = await getData('/profile');

    rootElement.insertAdjacentHTML(`beforeend`, innerHtml(profileData));

    const fileUpload = document.getElementById("profile-photo");
    const saveButton = document.querySelector(".save");
    const deleteButton = document.querySelector(".delete");
    
    fileUpload.addEventListener(`change`, photoChangeEventHandler);
    saveButton.addEventListener(`click`, saveClickedEventHandler);
    deleteButton.addEventListener(`click`, deleteClickedEventHandler);
}

window.addEventListener("load", loadEvent);