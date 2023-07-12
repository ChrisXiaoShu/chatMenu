// a function that will format the text with line breaks
// so that it can be displayed in the HTML
function formatText(text) {
    var formattedText = "";
    var textArray = text.split("\n");
    for (var i = 0; i < textArray.length; i++) {
        formattedText += textArray[i] + "<br>";
    }
    return formattedText;
}

function startButtonClick() {
  // Hide the start button
  const startBtn = document.getElementById("start-btn");
  startBtn.style.display = "none";
  var contentHeading = document.getElementById("content-heading");
  var contentText = document.getElementById("content-text");
  contentHeading.innerHTML = "";
  contentText.innerHTML = "Loading...";

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: prompt }
      ]
    })
  })
    .then(response => response.json())
    .then(data => {
      const answer = data.choices[0].message.content.trim();
      contentText.innerHTML = formatText(answer);
    })
    .catch(error => {
      console.error("Error:", error);
      contentText.innerHTML = "Error occurred. Please try again.";
    });
}


// Welcome start animation
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