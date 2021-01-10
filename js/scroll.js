// When the user scrolls the page, execute handleScroll
window.onscroll = function () {
    handleScroll()
};

// Get the header
const header = document.getElementsByTagName('header')[0];

window.onload = () => {
    const sheet = window.document.styleSheets[0];
    sheet.insertRule(`.sticky + .content { padding-top: ${header.offsetHeight}px }`,
        sheet.cssRules.length);
}

// Get the offset position of the navbar
const sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function handleScroll() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
