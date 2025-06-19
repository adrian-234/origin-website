const phones = document.querySelectorAll(".phone:not(:first-of-type)");

window.addEventListener("scroll", () => {
    phones.forEach(phone => {
        if (phone.offsetTop - window.scrollY <= 100) {
            phone.classList.add("revealed");
        } else {
            phone.classList.remove("revealed");
        }
    })
})