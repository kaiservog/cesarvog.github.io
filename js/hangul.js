var simple_vowel_hangul =  ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
var simple_vowel_romanic = ['a', 'ya', 'eo', 'yeo', 'o', 'yo', 'u', 'yu', 'eu', 'i'];

var compound_vowel_hangul = ['ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅢ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ'];
var compound_vowel_romanic = ['ae', 'yae', 'e', 'ye', 'ui', 'wa', 'wae', 'oe', 'wo', 'we', 'wi'];
 

var mixedCharactersHangul = [];
var mixedCharactersRomanic = [];
var secretIndex = 0;

var info = "Correct percentage: ";
var queue = [];
var correct = 0;
var incorrect = 0;

function mixCharacters(simple, compound) {
    mixedCharactersHangul = [];
    mixedCharactersRomanic = [];

    if(simple == true) {
        console.log("Simple characters is selected")
        mixedCharactersHangul = mixedCharactersHangul.concat(simple_vowel_hangul);
        mixedCharactersRomanic = mixedCharactersRomanic.concat(simple_vowel_romanic);
    }

    if(compound) {
        console.log("Compound characters is selected")
        mixedCharactersHangul = mixedCharactersHangul.concat(compound_vowel_hangul);
        mixedCharactersRomanic = mixedCharactersRomanic.concat(compound_vowel_romanic);
    }
}

function challange() {
    secretIndex = Math.floor(Math.random() * mixedCharactersHangul.length);
    hangul = mixedCharactersHangul[secretIndex];
    
    console.log("Hangul characters are", mixedCharactersHangul);
    console.log("Romanic characters are", mixedCharactersRomanic);
    console.log("Secret is", secretIndex);

    console.log("Character is", hangul);
    document.getElementById('hangulText').innerText = hangul;
    document.getElementById('romanic').focus();
}

function test(romanicChoose) {
    var chooseIndex = mixedCharactersRomanic.indexOf(romanicChoose);
    
    if(chooseIndex == secretIndex) {
        console.log("Correct");
        correct++;
        alertColor("#339966");
    } else {
        console.log("Incorrect");
        incorrect++;
        alertColor("#990033");
    }

    document.getElementById('romanic').value = ""
    updateInfo(mixedCharactersHangul[secretIndex], mixedCharactersRomanic[secretIndex]);
    setTimeout(challange, 1000);
}

function start() {
    mixCharacters(true, false);
    document.getElementById('romanic').addEventListener("keydown", function(e) {
        if(e.keyCode === 13) {
            console.log("valor digitado", e.target.value);
            test(e.target.value);
        }
    });

    document.onkeypress = function (e) {
        if (e.keyCode == 13) {
            document.getElementById('romanic').focus();
        }
    }

    updateInfo();
    challange();
}

function alertColor(color) {
    document.getElementById("hangulText").style.color = color; 
    setTimeout(function() {
        document.getElementById("hangulText").style.color = "black"; 
    }, 1000);
}

function updateInfo(hangul, romanic) {
    percentage = 0;
    if(correct + incorrect != 0) {
        percentage = Math.floor((correct * 100) / (correct + incorrect));
    }

    if(queue.length >= 5) {
        queue.shift();
    }

    if(hangul != undefined) {
        queue.push(hangul + "[" + romanic + "]");
    }
    
    info = "Correct percentage: " + percentage + "% " + queue;
    document.getElementById("bar").innerText = info;
}