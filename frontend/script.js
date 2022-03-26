function TextData(title, label, placeholder){
    this.title = title;
    this.label = label;
    this.placeholder = placeholder;
    this.textInput = function (){
        return `
        <div class="${this.title} input-data">
            <p>
                <label for="${this.title}">${this.label}</label>
            </p>
            <input type="text" placeholder="${this.placeholder}" id="${this.title}">
        </div>
        `;
    }
}

let personalInputs = [
    new TextData("first-name", "First name", "Szilvia Ágnes"),
    new TextData("last-name", "Last name", "Tóth"),
    new TextData("street-address", "Street address", "Bartók Béla út 53"),
    new TextData("zip-code ", "Zip code ", "1114"),
    new TextData("city-town", "City / town", "Budapest"),
    new TextData("country-state", "Country / state", "Hungary")
];

const personalInputDataHtml = () => {
    return personalInputs.map((data) => data.textInput()).join("");
}

const leftContent = () => {
    return `
    <div class="left-content">
        <h1>Profile editor</h1>
        ${contentBox("introduction", textareaContent, "", "")}
    </div>
    `;
}

const rightContent = () => {
    return contentBox("personal", personalInputDataHtml, "right-content", profilePhoto());
}

const contentBox = (contentTitle, inputDataFun, additionalClassName, additionalHtml) => {
    return `
    <div class="${contentTitle}-box content-box ${additionalClassName}">
        <div class="cover">
            <h2>${makeCapital(contentTitle)}</h2>
        </div>
        <div class="${contentTitle}-data-container input-data-container">
            ${inputDataFun(contentTitle)}
        </div>
        ${additionalHtml}
    </div>
    `;

}

const profilePhoto = function () {
    return `
    <div class="profile-photo">
        <img src="images/profiles/profile.jpg" alt="" >
        <button class="change-photo">Change profile photo</button>
    </div>
    `;
}

const textareaContent = (contentTitle) => {
    return `
        <p>
            <label for="${contentTitle}">${makeCapital(contentTitle)}</label>
        </p>
        <!-- rows="10" cols="50" -->
        <textarea  maxlength="150" name="${contentTitle}" form="profile-form" id="${contentTitle}">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis ullam, nesciunt possimus magnam veniam eos iure doloribus maiores cumque temporibus recusandae ipsa qui rerum cupiditate. Nobis sint possimus ab id. Amet rem ullam maiores. Quaerat rem vel sint eius tempora sed, possimus veritatis nemo eos laboriosam atque voluptatem? Est soluta ducimus consequuntur consectetur veritatis? Laudantium dolores quidem sequi voluptatum minima.
        </textarea>
    `;
}

function loadEvent(){
    let innerHtml = `
    <form action="" id="profile-form">
        ${leftContent()}
        ${rightContent()}
    </form>
    <div class="action-buttons">
        <button class="save">delete</button>
        <button class="delete">save</button>
        <!-- <input type="submit" value="Save"> -->
    </div>
    `;

    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML(`beforeend`, innerHtml);
}

window.addEventListener("load", loadEvent);

// helping functions
function makeCapital(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}