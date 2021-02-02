function darkMode(){
    var textColor = "gray"

    if(document.querySelectorAll('h1')[0].style.color == "gray"){
        textColor = "black"
        console.log("turn to white")
        document.body.style.backgroundColor="white";
        document.querySelectorAll(".card").forEach(e => e.style.backgroundColor = "white");
        document.querySelectorAll(".collapsible").forEach(e => e.style.backgroundColor = "#eeeeee");
        document.querySelectorAll(".fakeimg").forEach(e => e.style.backgroundColor = "#eeeeee");
        document.querySelectorAll(".content").forEach(e => e.style.backgroundColor = "#f1f1f1");
        document.querySelectorAll(".header").forEach(e => e.style.backgroundColor = "#dddddd");
        document.querySelectorAll(".row").forEach(e => e.style.backgroundColor = "#dddddd");
        document.querySelectorAll(".rightcolumn").forEach(e => e.style.backgroundColor = "#dddddd");
        document.querySelectorAll(".footer").forEach(e => e.style.backgroundColor = "#dddddd");
    }
    else{
        textColor = "gray"
        console.log("turn to black")
        document.body.style.backgroundColor="black";
        document.querySelectorAll(".card").forEach(e => e.style.backgroundColor = "#303030");
        document.querySelectorAll(".collapsible").forEach(e => e.style.backgroundColor = "#202020");
        document.querySelectorAll(".fakeimg").forEach(e => e.style.backgroundColor = "#202020");
        document.querySelectorAll(".content").forEach(e => e.style.backgroundColor = "#101010");
        document.querySelectorAll(".header").forEach(e => e.style.backgroundColor = "#202020");
        document.querySelectorAll(".row").forEach(e => e.style.backgroundColor = "#202020");
        document.querySelectorAll(".rightcolumn").forEach(e => e.style.backgroundColor = "#202020");
        document.querySelectorAll(".footer").forEach(e => e.style.backgroundColor = "#202020");
    }
    document.querySelectorAll('h1').forEach(e => e.style.color = textColor);
    document.querySelectorAll('h2').forEach(e => e.style.color = textColor);
    document.querySelectorAll('h3').forEach(e => e.style.color = textColor);
    document.querySelectorAll('h4').forEach(e => e.style.color = textColor);
    document.querySelectorAll('h5').forEach(e => e.style.color = textColor);
    document.querySelectorAll('div').forEach(e => e.style.color = textColor);
    document.querySelectorAll('button').forEach(e => e.style.color = textColor);
    document.querySelectorAll('p').forEach(e => e.style.color = textColor);
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
    content.style.display = "none";
    } else {
    content.style.display = "block";
    }
    });
}

var data = require('https://rustcoleone.github.io/directory.json'); //(with path)
console.log(data);
var string ="";
for (i in data) {
string +='<div class="row"> <div class="col-xs-5"><span class="name">'+data[i].name+'</span></div><div class="col-xs-2"></div><div class="col-xs-5"><input type="number" class="percentage">'+data[i].percentage+'</div></div>';
};
document.getElementById('json').innerHTML =string