// a function that will format the text with line breaks
// so that it can be displayed in the HTML
let chatHistory = [];

function formatText(text) {
    var formattedText = "";
    var textArray = text.split("\n");
    for (var i = 0; i < textArray.length; i++) {
        formattedText += textArray[i] + "<br>";
    }
    return formattedText;
}

function sendOpentAIRequest(history, isEnd=false) {
  var messages = [
    { role: "system", content: prompt },
  ]
  if (isEnd) {
    messages = []
  }
  if (history.length > 0) {
    // append chatHistory after message list
    messages = messages.concat(history);
  }


  var contentHeading = document.getElementById("content-heading");
  var contentText = document.getElementById("content-text");
  contentHeading.innerHTML = "";
  contentText.innerHTML = "Loading...";

  const userInputContainer = document.getElementById("user-input-container");
  userInputContainer.style.display = "none";;

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
    })
  })
  .then(response => response.json())
  .then(data => {
    const answer = data.choices[0].message.content.trim();
    chatHistory.push({ role: "assistant", content: answer });
    contentText.innerHTML = formatText(answer);
      // Show the user input area
      if(chatHistory.length >= 7) {
        const userInputContainer = document.getElementById("user-input-container");
        userInputContainer.style.display = "none";
        var recommadBtn = document.getElementById("recommad-btn");
        recommadBtn.classList.remove("hidden");
      }else {
        const userInputContainer = document.getElementById("user-input-container");
        userInputContainer.style.display = "block";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    contentText.innerHTML = "Error occurred. Please try again.";
  });
}
    

function startButtonClick() {
  // Hide the start button
  const startBtn = document.getElementById("start-btn");
  startBtn.style.display = "none";
  var contentHeading = document.getElementById("content-heading");
  var contentText = document.getElementById("content-text");
  contentHeading.innerHTML = "";
  contentText.innerHTML = "Loading...";

  sendOpentAIRequest([]);
}

function recommadButtonClick() {
  // Hide the start button
  const startBtn = document.getElementById("recommad-btn");
  startBtn.style.display = "none";
  var contentHeading = document.getElementById("content-heading");
  var contentText = document.getElementById("content-text");
  contentHeading.innerHTML = "";
  contentText.innerHTML = "Loading...";

  // get the last element of chatHistory
  summary = chatHistory.slice(-1);
  summary.push({ role: "user", content: menuPrompt });

  sendOpentAIRequest(summary, true);
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

const userInput = document.getElementById("user-input");

userInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    let inputText = userInput.value;
    // Send OpenAI API request with the inputText
    if (chatHistory.length >= 5) {
      inputText = inputText + `，你的回答請直接條列式的幫我總結我的需求，不要我推薦任何酒款，在最後加上這句:需要為您推薦一款調酒嗎`;
    }
    chatHistory.push({ role: "user", content: inputText })
    sendOpentAIRequest(chatHistory);
    userInput.value = ""; // Clear the input after sending the request
  }
});