console.log("hello");
let buttons = document.querySelectorAll("button");

buttons.forEach((b) => {
    b.addEventListener("click", () => {
        let classnum = b.getAttribute("data-class");
        localStorage.setItem("selectedClass", classnum);
        window.location.href = "question.html";
    });
});
