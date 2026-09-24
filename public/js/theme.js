
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("ticket-loop-theme");

if (savedTheme) {
    root.dataset.theme = savedTheme;
} else {
    root.dataset.theme = "dark";
}


themeToggle.addEventListener("click", () => {

    const currentTheme = root.dataset.theme;

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    root.dataset.theme = newTheme;

    localStorage.setItem(
        "ticket-loop-theme",
        newTheme
    );

});
