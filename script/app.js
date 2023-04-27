/* Project:  Project 5
Name: Isaac Reyes
Submitted: 4/26/23
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection (1-2 paragraphs):  A youtube video from Beyond Fireship titled, "Subtle, yet Beatiful Scroll Animations" helped me to write the following code. This code handles the Intro fade in effect.*/

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
hiddenElements.forEach((elem) => observer.observe(elem));