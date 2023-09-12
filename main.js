let startDate = null;
let endDate = null;

InitCheckInCheckOutDatePicker();
InitBurgerMenu();
InitScrollButton();
InitPopUp();
InitPopUpContact()

function InitCheckInCheckOutDatePicker() {
    const checkInText = document.querySelector('.check-in');
    const checkOutText = document.querySelector('.check-out');
    const options = {
        type: 'multiple',
        settings: {
            range: {
                disablePast: true,
            },
            selection: {
                day: 'multiple-ranged',
            },
            visibility: {
                daysOutside: false,
                theme: 'light'
            },
        },
        actions: {
            clickDay(event, dates) {
                SetUpCheckInCheckOut(dates, checkInText, checkOutText);
            },
        },
    };
    CreateCalendar(options);
}

function SetUpCheckInCheckOut(dates, checkInText, checkOutText) {
    if (dates.length >= 1) {
        startDate = dates[0];
    }
    if (dates.length > 1) {
        endDate = dates[dates.length - 1];
    }
    if (startDate != undefined) {
        checkInText.innerText = startDate.toString();
    }
    if (endDate != undefined) {
        checkOutText.innerText = endDate.toString();
    }
}

function CreateCalendar(options) {
    const calendarContainer = document.querySelector('.calendar-container');
    const dateFrom = document.querySelector('.date-from');
    const dateTo = document.querySelector('.date-to');

    if (calendarContainer && dateFrom && dateTo) {
        document.addEventListener('mouseup', (event) => {
            if (!calendarContainer.contains(event.target)
                && !dateFrom.contains(event.target)
                && !dateTo.contains(event.target)) {
                calendarContainer.classList.remove('calendar-container__open')
            }
        })
    }
    if (dateFrom) {
        dateFrom.addEventListener('click', () => {
            calendarContainer.classList.toggle('calendar-container__open');
        });
    }
    if (dateTo) {
        dateTo.addEventListener('click', () => {
            calendarContainer.classList.toggle('calendar-container__open');
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        const calendar = new VanillaCalendar('#calendar', options);
        calendar.init();
    });
}

function InitBurgerMenu() {
    const header = document.querySelector('.header');
    const hamburger = header.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    if (header && hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('menu_open');
            hamburger.classList.toggle('close');
        });
    }
}

function InitScrollButton() {
    const goTopBtn = document.querySelector(".go-top");

    if (goTopBtn) {
        window.addEventListener("scroll", () => { trackScroll(goTopBtn) });
        goTopBtn.addEventListener("click", goTop);
    }
}

function trackScroll(goTopBtn) {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if (scrolled > coords) {
        goTopBtn.classList.add("go-top--show");
    } else {
        goTopBtn.classList.remove("go-top--show");
    }
}

function goTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -30);
        setTimeout(goTop, 0);
    }
}

function InitPopUp() {
    let popupBg = document.querySelector('.popup-container');
    let popup = document.querySelector('.popup');
    let openPopupButtons = document.querySelectorAll('.open-popup');
    let closePopupButton = document.querySelector('.close-popup');

    if (popupBg && popup && openPopupButtons && closePopupButton) {
        openPopupButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                popupBg.classList.add('active');
                popup.classList.add('active');
            })
        });
        closePopupButton.addEventListener('click', () => {
            popupBg.classList.remove('active');
            popup.classList.remove('active');
        });
        document.addEventListener('click', (e) => {
            if (e.target === popupBg) {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            }
        });
    }
}

function InitPopUpContact() {
    let popupBg = document.querySelector('.popup-container-contact');
    let popup = document.querySelector('.popup-contact');
    let openPopupButton = document.querySelector('.open-popup-contact');
    let closePopupButton = document.querySelector('.close-popup-contact');

    if (popupBg && popup && openPopupButton && closePopupButton) {
        openPopupButton.addEventListener('click', (e) => {
            console.log(popupBg);
            popupBg.classList.add('active');
            popup.classList.add('active');
        });
        closePopupButton.addEventListener('click', () => {
            popupBg.classList.remove('active');
            popup.classList.remove('active');
        });
        document.addEventListener('click', (e) => {
            if (e.target === popupBg) {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            }
        });
    }
}

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}