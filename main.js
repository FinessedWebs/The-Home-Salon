/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu')
    navToggle = document.getElementById('nav-toggle')
    navClose = document.getElementById('nav-close')
    
    /*===== MENU SHOW =====*/
    
    /* Validate if constant exists */
    
    if(navToggle){
         navToggle.addEventListener('click', () =>{ 
            navMenu.classList.add('show-menu') 
        })
    
    }
    
    /*===== MENU HIDDEN =====*/
    /* Validate if constant exists */
    
    if(navClose){
    navClose.addEventListener('click', () =>{
    navMenu.classList.remove('show-menu')
    
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navlenu = document.getElementById('nav-menu')
    // When we click on each nav_link, we remove the show-menu cl navMenu.classList.remove('show-menu')

} 
    navLink.forEach(n => n.addEventListener('click', finkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/

const bgHeader = () =>{

    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add t
    this.scrolly >= 50 ? header.classList.add('bg-header')
                    : header.classList.remove('bg-header')
}
    window.addEventListener('scroll', bgHeader)

/*=============== GSAP ANIMATION ===============*/


