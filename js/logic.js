const page = document.getElementsByTagName('html')[0];
// Todo, add cool animation for text change.
// Todo, check more paramters similar to that site, the potential differences.

// if (window.requestIdleCallback) {
//     requestIdleCallback(function () {
//         Fingerprint2.get(function (components) {
//           console.log(components) // an array of components: {key: ..., value: ...}
//         })
//     })
// } else {
//     setTimeout(function () {
//         Fingerprint2.get(function (components) {
//           console.log(components) // an array of components: {key: ..., value: ...}
//         })
//     }, 500)
// }

function addNewText(text, tag) {
    let divContainer = document.getElementById("container");
    let paragraphNode = document.createElement(tag);
    paragraphNode.innerText = text
    divContainer.appendChild(paragraphNode);
}

function mouseMovementCheck() {
    page.addEventListener("mousemove", function () {
        document.getElementById("mouseEvent").innerText = "YES";
    })
}

function keyboardEventCheck() {
    page.addEventListener("keydown", function () {
        document.getElementById("keyboardEvent").innerText = "YES";
    })
}

function browserTypeCheck() {
    // naive check
    let ua = detect.parse(navigator.userAgent);
    document.getElementById("browserInfo").innerText =
        `You're using ${ua.browser.family}, ` +
        `Version ${ua.browser.major}.${ua.browser.minor}.${ua.browser.patch}`
    let devMan = ua.device.manufacturer ?
        ` your device manufacturer is ${ua.device.manufacturer}` : "";
    document.getElementById("deviceInfo").innerText =
        `You're on a ${ua.device.type} device${devMan}, ` +
        `and you're using ${ua.os.name}`

    // less naive check - to do.
}

function inspectElementOpenCheck() {
    // hack found from: https://stackoverflow.com/a/48287643/9420670
    let consoleOpened = false;

    // i imagine this could be any element
    let element = new Image();
    Object.defineProperty(element, 'id', {
        get: function () {
            consoleOpened = true;
            // not necessary, but meh
            throw new Error("Dev tools checker");
        }
    });

    requestAnimationFrame(function check() {
        // this entire function hinges on the fact that console.dir does not run without an
        // active console session
        console.dir(element);
        if (consoleOpened) {
            console.log("Gotcha Bitch")
            document.getElementById("debugOpenTest").innerText =
                "You opened the debugger tool! You could just be a random coder checking" +
                " out my awesome work, but now i'm suspicious of all requests that look" +
                " like you.";
            return;
        }
        // recursive checking, super fast
        requestAnimationFrame(check);
    });
}

function getFingerprint() {
    setTimeout(function () {
        Fingerprint2.get(function (components) {
            console.log(components);
        })
    }, 500)
}

document.addEventListener('DOMContentLoaded', (event) => {
    mouseMovementCheck();
    keyboardEventCheck();
    browserTypeCheck();
    inspectElementOpenCheck();
    getFingerprint();
});