//creating buttons array as we have learned
var buttons=document.querySelectorAll(".sigil");

//adding event listener to the mouse click
//in adition there are functions for the button press using the selectors from the css
//and there are sound and animation functions 
for (var i=0;i<buttons.length;i++)
{
    buttons[i].addEventListener("click", 
        function()
        { 
        var buttonInnerHTML=this.innerHTML;
        buttonAnim(buttonInnerHTML);
        makeSound(buttonInnerHTML);
        backgroundAnim(buttonInnerHTML, fadeInBackground, fadeOutBackground);
        }
        )
}
//adding event listener to key pressing
//same functions as explained above
document.addEventListener("keypress",function(event)
{
    buttonAnim(event.key.toUpperCase());
    makeSound(event.key.toUpperCase());
    backgroundAnim(event.key.toUpperCase(), fadeInBackground, fadeOutBackground);
})

//sound function for each button
var currentAudio;
function makeSound(key) 
{
    if (currentAudio) 
        currentAudio.pause();

    switch (key) {
        case 'S':
            currentAudio = new Audio("./Assets/Sounds/stark_audio.mp3");
            break;
        case 'L':
            currentAudio = new Audio("./Assets/Sounds/lannister_audio.mp3");
            break;
        case 'T':
            currentAudio = new Audio("./Assets/Sounds/targaryen_audio.mp3");
            break;
        case 'B':
            currentAudio = new Audio("./Assets/Sounds/baelish_audio.mp3");
            break;
        case 'M':
            currentAudio = new Audio("./Assets/Sounds/martell_audio.mp3");
            break;
        case 'G':
            currentAudio = new Audio("./Assets/Sounds/greyjoy_audio.mp3");
            break;
        case 'V':
            currentAudio = new Audio("./Assets/Sounds/varys_audio.mp3");
            break;
        default:
            alert(" No Such Sigil");
            return;
    }
    currentAudio.play();
}

//button animation function which gets the specific button pressed so it can add the click animation and remove it
function buttonAnim(currentKey)
{
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("sigilPress");
    setTimeout(function(){activeButton.classList.remove("sigilPress");},100);
}


//THIS IS WHERE WE HAVE A NEW JS PRINCIPLE://

//background animation- the main function in this site using a couple of js techniques that are new to us
//the first one: callBack functions - used for the fade in and fade out elements
//this technique helps the site preform in the order wanted, without them, the background will change before the fade
//the second one: async and await - using promises in the functions bellow, will explain more at the bottom
async function backgroundAnim(currentKey, callbackFunc1, callbackFunc2)
{
    //calling the fade in of the black screen
    await callbackFunc1();

    //varibles (as seen, the changes are made on the html selector)
    var backgroundColor = document.querySelector('html')
    var newHead;
    var newQuote;
    switch (currentKey)
    {  
        case 'S':
            backgroundColor.classList.remove(backgroundColor.classList.item(0))
            backgroundColor.classList.add("s_back")
            newHead = "House Stark";
            newQuote = "Leave one wolf alive and the sheep are never safe...";
            break;
        case 'L':
            backgroundColor.classList.remove(backgroundColor.classList.item(0))
            backgroundColor.classList.add("l_back")
            newHead = "House Lannister";
            newQuote = "A lion doesn't concern himself with the opinions of the sheep..."
            break;
        case 'T':
            backgroundColor.classList.remove(backgroundColor.classList.item(0))
            backgroundColor.classList.add("t_back")
            newHead = "House Targaryen";
            newQuote = "Love is the death of duty...";
            break;
        case 'B':
            backgroundColor.classList.remove(backgroundColor.classList.item(0))
            backgroundColor.classList.add("b_back")
            newHead = "House Baelish";
            newQuote = "Chaos isn't a pit. Chaos is a ladder...";
            break;
        case 'M':
            backgroundColor.classList.remove(backgroundColor.classList.item(0))
            backgroundColor.classList.add("m_back")
            newHead = "House Martell";
            newQuote = "I believe in second chances. I don't believe in third chances...";
            break;
        case 'G':
            backgroundColor.classList.remove(backgroundColor.classList.item(0))
            backgroundColor.classList.add("g_back")
            newHead = "House Greyjoy";
            newQuote = "What Is Dead May Never Die...";
            break;
        case 'V':
            backgroundColor.classList.remove(backgroundColor.classList.item(0))
            backgroundColor.classList.add("v_back")
            newHead = "Varys The Spider";
            newQuote = "They say, every time a Targaryen is born, the gods toss a coin and the world holds its breath...";
            break;
    }
    //updating the house name and the quote 
    document.getElementById("houseName").innerHTML = newHead;
    document.getElementById("quote").innerHTML = newQuote;
    //black screen fades out
    callbackFunc2();
}

//fade in of the black screen
//as I have mentioned, this function uses the JS promise, which works with async and await
//and continues only when the promise is complete - in this case, when the fade ended
function fadeInBackground()
{
    return new Promise((resolve) => 
    {
        const BlackFade = document.createElement('div');
        BlackFade.classList.add("blackScreen");
        document.body.appendChild(BlackFade);
        setTimeout(function() {
            BlackFade.style.opacity = '1';
            setTimeout(resolve,300)},1);
    });
}

//fade out of the black screen
//a simpler function which changes the black div opacity again to 0
//we can see a usage of the "parentNode" since we are setting "blackFade" according to a css selector, and we want to remove it's father elemnt
function fadeOutBackground() 
{
    var blackFade = document.querySelector(".blackScreen"); 
    if (blackFade) {
        setTimeout(function(){blackFade.style.opacity = '0';}, 1);
        setTimeout(function(){blackFade.parentNode.removeChild(blackFade);}, 1000);
    }
}



//important point//
//in the backgroundAnimation since we are using different backgrounds (deleting and adding each time) and we don't know what was the last background
//we are not really creating a fade in fade out, we are actually creating a new div which covers the whole screen
//while the background changes