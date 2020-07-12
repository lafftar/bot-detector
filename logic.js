const page = document.getElementsByTagName('html')[0];

function mouseMovementCheck(){
    page.addEventListener("mousemove",function(){
        document.getElementById("mouseEvent").innerText = "YES"
    })
}

function keyboardEventCheck(){
    page.addEventListener("keydown",function(){
        document.getElementById("keyboardEvent").innerText = "YES"
    })
}


document.addEventListener('DOMContentLoaded', (event) => {
    mouseMovementCheck();
    keyboardEventCheck()
});