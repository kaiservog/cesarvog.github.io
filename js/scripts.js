
//colors
var whiteColor = '#F9F9F9';
var darkColor  = '#0C0712';

document.addEventListener('DOMContentLoaded', function() {
    console.log("easteregg")
    var hour = new Date().getHours();
    

    if(hour > 7 && hour < 19) {
        setMode(whiteColor, darkColor, darkColor); //day mode
    } else {
        setMode(darkColor, whiteColor, whiteColor); //night mode
    }
 }, false);

 function setMode(bgColor, fontColor, linkColor) {
    document.body.style.background = bgColor;
    
    //links
    var elms = document.getElementsByTagName("a");
    for(var i=0; i<elms.length; i++) {
        elms[i].style.color = linkColor;
    }

    //h
    var elms = document.getElementsByTagName("h1");
    for(var i=0; i<elms.length; i++) {
        elms[i].style.color = fontColor;
    }

    //p
    var elms = document.getElementsByTagName("p");
    for(var i=0; i<elms.length; i++) {
        elms[i].style.color = fontColor;
    }
 }