const page = document.getElementsByTagName('html')[0];

function mouseMovementCheck(){
    page.addEventListener("mousemove",function(){
        document.getElementById("mouseEvent").innerText = "YES";
    })
}

function keyboardEventCheck(){
    page.addEventListener("keydown",function(){
        document.getElementById("keyboardEvent").innerText = "YES";
    })
}

function browserTypeCheck(){
    // naive check
    let ua = detect.parse(navigator.userAgent);
    addNewText("This is the information I found out about your setup (naive):",
        "h2");
    console.log(ua)
    addNewText(`You're using ${ua.browser.family}, ` +
    `Version ${ua.browser.major}.${ua.browser.minor}.${ua.browser.patch}`,"p")
    let devMan = ua.device.manufacturer ?
        ` your device manufacturer is ${ua.device.manufacturer}` : "";
    addNewText(`You're on a ${ua.device.type} device${devMan}, ` +
     `and you're using ${ua.os.name}`,"p")

    // less naive check
}

function addNewText(text, tag){
    let divContainer = document.getElementById("container");
    let paragraphNode = document.createElement(tag);
    paragraphNode.innerText = text
    divContainer.appendChild(paragraphNode);
}

document.addEventListener('DOMContentLoaded', (event) => {
    mouseMovementCheck();
    keyboardEventCheck();
    browserTypeCheck();
});