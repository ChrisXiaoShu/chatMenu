document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var diamondContainer = document.getElementById("diamond-container");
        var contentHeading = document.getElementById("content-heading");
        var contentText = document.getElementById("content-text");

        diamondContainer.style.animation = "none";
        diamondContainer.offsetHeight; // Force reflow to reset animation
        diamondContainer.style.animation = null;

        diamondContainer.classList.add("hidden");
        contentHeading.classList.remove("hidden");
        contentText.classList.remove("hidden");
        contentHeading.style.animation = "fadeIn 3s ease-in-out";
        contentText.style.animation = "fadeIn 5s ease-in-out";
    }, 1000);
});
