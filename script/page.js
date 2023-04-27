/* Project:  Project 5
Name: Isaac Reyes
Submitted: 4/26/23
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection (1-2 paragraphs):  This code handles the theme toggle. I really enjoyed being 
    able to implement a theme change. I have made a couple of websites in the past but they 
    all had the same theme. I also really like how I was able to implement a background hero 
    img change on the theme change. */

// Detect when theme toggle button is pressed
const themeSwitch = document.getElementById("theme-switch")
const hero = document.getElementById("card-item1")

// My own take on switching themes. This only changes colors and 
// other elements specified in :root.

// themeSwitch.addEventListener("click", () => {
//     themeSwitch.classList.toggle("fa-flip-both") 
//     document.documentElement.classList.toggle("dark-theme");
// });

// The following block of code is from Ken Jenson
document.getElementById("theme-switch").addEventListener("click", function() {
    themeSwitch.classList.toggle("fa-flip-both") 
    toggleStylesheet("styles/darktheme.css");

    //insert 'link' element into head just below styles.css reference
  })
  
  function toggleStylesheet(href, onoff) {
    var existingNode = 0 //get existing stylesheet node if it already exists:
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf(href) > -1) existingNode = document.styleSheets[i].ownerNode
    } 
    if (onoff == undefined) onoff = !existingNode //toggle on or off if undefined
    if (onoff) { //TURN ON:
        if (existingNode) return onoff //already exists so cancel now
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.getElementsByTagName('head')[0].appendChild(link);
        hero.style.backgroundImage = "url(../images/line-mountains.png)"
    } else { //TURN OFF:
        if (existingNode) existingNode.parentNode.removeChild(existingNode)
        hero.style.backgroundImage = "url(../images/image.jpg)"
    }
    return onoff
}

