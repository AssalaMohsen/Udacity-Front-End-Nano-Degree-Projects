/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
let sectionsWithNavbarItems = [];
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
/*remove active class from all sections and remove active_link class from their navbar item,
except a section with a specific id*/
function removefromSections(id) {
    for (let sectionWithNavbarItem of sectionsWithNavbarItems) {
        if (!(sectionWithNavbarItem.section.id == id)) {
            sectionWithNavbarItem.section.classList.remove("active");
            sectionWithNavbarItem.navbarItem.classList.remove("active_link");
        }
    }
}

function isTopSectionInViewport(el) {
    // get the coordinates of the element box from the viewport
    const rect = el.getBoundingClientRect();
    // return true if the element top is near the top of the viewport, false otherwise
    return (
        rect.top >= 0 &&
        // 0.4 works well across devices without overlapping sections
        rect.top <=
        0.4 * (window.innerHeight || document.documentElement.clientHeight)
    );
}

function create_scroll_to_top_btn() {
    const htmlTextToAdd = `<a href="#" class="scroll-to-top-button hide">Up</a>`;
    document.body.insertAdjacentHTML("afterbegin", htmlTextToAdd);
}

function show_scroll_to_top_btn() {

    const btn = document.querySelector(".scroll-to-top-button");
    if (window.pageYOffset <= 0.6 * window.innerHeight) {
        btn.classList.add("hide");
    } else {
        btn.classList.remove("hide");
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            // smooth scroll to top of page
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        });
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildNav() {
    // get navbar list to append list elements that include anchors to sections
    let navbar = document.getElementById('navbar__list');
    //get sections to loop through
    let sections = document.getElementsByTagName('section');
    // loop through sections to add each to navbar list
    for (let section of sections) {
        //get section titlle
        let title = section.getElementsByTagName('h2')[0].textContent;
        // create a list element for the section
        const newLi = document.createElement('li');
        // create anchor element for the section
        htmlTextToAdd = `<a href='#${section.id}' class="menu__link">${title}</a>`;
        // append anchor element to link element
        newLi.insertAdjacentHTML('afterbegin', htmlTextToAdd);
        // append link to navbar
        navbar.appendChild(newLi);
        // append section with its navbar item to sectionsWithNavbarItems list
        sectionsWithNavbarItems.push({ 'section': section, 'navbarItem': newLi });

    }
}
// Add class 'active' to section when near top of viewport
function addActiveToSection() {
    let timer = null;
    /*get the navbar menu to hide it if user stops scrolling for 10 seconds
     and reveel it when user starts scrolling again */
    let navbarmenu = document.getElementsByClassName('page__header')[0];
    window.addEventListener('scroll', function() {
        // remove navbar menu on scroll action and clear the timer
        navbarmenu.classList.remove("hide");
        clearTimeout(timer);
        // set timer to hide navigation menu if user stops scrolling for 10 seconds */
        timer = setTimeout(function() {
            navbarmenu.classList.add("hide");
        }, 10000);

        showBtnUp();
        /*loop through sectionWithNavbarItem to add active class to the section in viewport
        and add active_link class to its navbar item and remove both for other sections*/
        for (let sectionWithNavbarItem of sectionsWithNavbarItems) {
            if (sectionWithNavbarItem.section.getBoundingClientRect().top - 100 <= 0) {
                removefromSections(sectionWithNavbarItem.section.id);
                sectionWithNavbarItem.section.classList.add("active");
                sectionWithNavbarItem.navbarItem.classList.add("active_link");
            }
        }
    });
}

// Scroll to anchor ID using scrollTO event
function scrollToAnchorId() {
    //get the navbar links
    const links = document.getElementsByClassName('menu__link');
    //loop through the links to add event listner for click event 
    i = 1;
    for (let link of links) {
        const section = document.getElementById('section' + i);
        link.addEventListener('click', function(event) {
            //prevent default behavior
            event.preventDefault();
            //scroll to section smoothly
            window.scrollTo({
                top: section.offsetTop - 50,
                behavior: 'smooth',
            });
        });
        i++;
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
buildNav();
// Create the scroll to top button
createBtnUp();
// Scroll to section on link click
scrollToAnchorId();
// Set sections as active
addActiveToSection();