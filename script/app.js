// Detect when information boxes are visble and start animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
});

const hiddenElements = document.querySelectorAll('.box');
hiddenElements.forEach((el) => observer.observe(el));


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