document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var diamondContainer = document.getElementById("diamond-container");
        var contentHeading = document.getElementById("content-heading");
        var contentText = document.getElementById("content-text");
        var startBtn = document.getElementById("start-btn");

        diamondContainer.style.animation = "none";
        diamondContainer.offsetHeight; // Force reflow to reset animation
        diamondContainer.style.animation = null;

        diamondContainer.classList.add("hidden");
        contentHeading.classList.remove("hidden");
        contentText.classList.remove("hidden");
        contentHeading.style.animation = "fadeIn 1s ease-in-out";
        contentText.style.animation = "fadeIn 1s ease-in-out";

        setTimeout(function() {
            startBtn.classList.remove("hidden");
            startBtn.style.animation = "fadeIn 1s ease-in-out";
        }, 1000); // Delay the display of the start button by 1 second
    }, 1000);
});