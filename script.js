/* ==================================================
   ALVEE PORTFOLIO
================================================== */


/* ================================
   ELEMENTS
================================ */

const body =
    document.body;

const header =
    document.getElementById(
        "header"
    );

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );

const backToTop =
    document.getElementById(
        "backToTop"
    );

const currentYear =
    document.getElementById(
        "currentYear"
    );

const contactForm =
    document.getElementById(
        "contactForm"
    );


/* ================================
   CURRENT YEAR
================================ */

currentYear.textContent =
    new Date().getFullYear();


/* ================================
   DARK / LIGHT THEME
================================ */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (
    savedTheme === "light"
) {

    body.classList.add(
        "light-theme"
    );

}


themeToggle.addEventListener(
    "click",
    () => {

        body.classList.toggle(
            "light-theme"
        );


        if (
            body.classList.contains(
                "light-theme"
            )
        ) {

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

        } else {

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

        }

    }
);


/* ================================
   HEADER SCROLL
================================ */

function updateHeader() {

    if (
        window.scrollY > 25
    ) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader
);


updateHeader();


/* ================================
   MOBILE MENU
================================ */

mobileMenuButton.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle(
            "open"
        );

        mobileMenuButton
            .classList
            .toggle(
                "open"
            );

    }
);


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navMenu.classList.remove(
                "open"
            );

            mobileMenuButton
                .classList
                .remove(
                    "open"
                );

        }
    );

});


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            navMenu.classList.remove(
                "open"
            );

            mobileMenuButton
                .classList
                .remove(
                    "open"
                );

        }

    }
);


/* ================================
   ACTIVE NAVIGATION
================================ */

function updateNavigation() {

    let activeSection =
        "home";


    sections.forEach(section => {

        const top =
            section.offsetTop
            - 170;


        const bottom =
            top
            + section.offsetHeight;


        if (
            window.scrollY >= top
            &&
            window.scrollY < bottom
        ) {

            activeSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );


        if (
            link.getAttribute(
                "href"
            )
            ===
            `#${activeSection}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation
);


/* ================================
   SCROLL REVEAL
================================ */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add(
                                "visible"
                            );


                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {

            threshold: 0.12,

            rootMargin:
                "0px 0px -30px 0px"

        }

    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* ================================
   BACK TO TOP
================================ */

function updateBackButton() {

    if (
        window.scrollY > 550
    ) {

        backToTop.classList.add(
            "visible"
        );

    } else {

        backToTop.classList.remove(
            "visible"
        );

    }

}


window.addEventListener(
    "scroll",
    updateBackButton
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior:
                "smooth"

        });

    }
);


/* ================================
   CONTACT FORM
================================ */

contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "name"
                )
                .value
                .trim();


        const email =
            document
                .getElementById(
                    "email"
                )
                .value
                .trim();


        const message =
            document
                .getElementById(
                    "message"
                )
                .value
                .trim();


        if (
            !name
            ||
            !email
            ||
            !message
        ) {

            alert(
                "Please complete all fields."
            );

            return;

        }


        const subject =
            encodeURIComponent(
                `Portfolio message from ${name}`
            );


        const bodyMessage =
            encodeURIComponent(

                `Name: ${name}\n`
                +
                `Email: ${email}\n\n`
                +
                `${message}`

            );


        /*
        Replace your@email.com
        with your real email.
        */

        window.location.href =

            `mailto:itsalveehoque@gmail.com`
            +
            `?subject=${subject}`
            +
            `&body=${bodyMessage}`;

    }
);


/* ================================
   SUBTLE PROJECT TILT
================================ */

const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


if (finePointer) {

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    (
                        event.clientX
                        - rect.left
                    )
                    / rect.width
                    - 0.5;


                const y =
                    (
                        event.clientY
                        - rect.top
                    )
                    / rect.height
                    - 0.5;


                card.style.transform =
                    `
                    perspective(1200px)
                    rotateY(${x * 1.3}deg)
                    rotateX(${y * -1.3}deg)
                    translateY(-7px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}