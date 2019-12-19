var simple_vowel_hangul =  ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
var simple_vowel_romanic = ['a', 'ya', 'eo', 'yeo', 'o', 'yo', 'u', 'yu', 'eu', 'i'];

var compound_vowel_hangul = ['ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅢ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ'];
var compound_vowel_romanic = ['ae', 'yae', 'e', 'ye', 'ui', 'wa', 'wae', 'oe', 'wo', 'we', 'wi'];

var simple_consoant_hangul = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
var simple_consoant_romanic = ['g', 'n', 'd', 'l r', 'm', 'b', 's', 'ng', 'j', 'ch', 'k', 't', 'p', 'h'];

var double_consoant_hangul = ['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ'];
var double_consoant_romanic = ['kk', 'tt', 'pp', 'ss', 'jj'];

var compound_consoant_hangul = ['ㄳ', 'ㄵ', 'ㄶ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅄ'];
var compound_consoant_romanic = ['gs', 'nj', 'nh', 'lg', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'bs'];

var mixedCharactersHangul = [];
var mixedCharactersRomanic = [];

var secretIndex = 0;

var info = "Correct percentage: ";
var queue = [];
var correct = 0;
var incorrect = 0;

function mixCharacters(simple, compound, simplec, double, compoundc) {
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

    if(simplec) {
        console.log("Simple c characters is selected")
        mixedCharactersHangul = mixedCharactersHangul.concat(simple_consoant_hangul);
        mixedCharactersRomanic = mixedCharactersRomanic.concat(simple_consoant_romanic);
    }

    if(double) {
        console.log("Double c characters is selected")
        mixedCharactersHangul = mixedCharactersHangul.concat(double_consoant_hangul);
        mixedCharactersRomanic = mixedCharactersRomanic.concat(double_consoant_romanic);
    }

    if(compoundc) {
        console.log("Compound c characters is selected")
        mixedCharactersHangul = mixedCharactersHangul.concat(compound_consoant_hangul);
        mixedCharactersRomanic = mixedCharactersRomanic.concat(compound_consoant_romanic);
    }
}

function listsEvent(e) {
    console.log("event for mix")
    var simp = document.getElementById("l-simple").checked;
    var comp = document.getElementById("l-compound").checked;
    var simpc = document.getElementById("l-simplec").checked;
    var doubl = document.getElementById("l-doublec").checked;
    var compc = document.getElementById("l-compoundc").checked;

    if(simp == false && 
        comp == false &&
        simpc == false &&
        doubl == false &&
        compc == false) {
        simp = true
    }

    mixCharacters(simp, comp, simpc, doubl, compc);
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
    listsEvent();
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