const elements = {
  display: document.querySelector(".display"),
  history: document.querySelector(".history"),
  buttons: document.querySelectorAll(
    "#key-1, #key-2, #key-3, #key-4, #key-5, #key-6, #key-7, #key-8, #key-9, #key-10, #key-11, #key-12, #key-13, #key-14, #key-15, #key-16, #key-17, #key-18, #key-19, #key-20"
  ),
};

let currentState = "0";
let displayState = "0";

function saveState() {
  localStorage.setItem("calcCache", `${displayState}=${currentState}`);
}

function update(value) {
  elements.display.textContent = value.slice(0, 15);
  elements.history.textContent = localStorage.getItem("calcCache").slice(0, 14);
  if (elements.display.textContent.length > 11) {
    elements.display.classList.add("overflow");
  } else {
    elements.display.classList.remove("overflow");
  }
}

function addChar(char) {
  let modChar = char;
  switch (modChar) {
    case "/":
      modChar = "\u00f7";
      break;
    case "*":
      modChar = "\u00d7";
      break;
  }
  if (currentState === "0" || displayState === "0") {
    switch (char) {
      case ".":
        currentState = "0.";
        displayState = "0.";
        break;
      case "000":
        currentState = "0";
        displayState = "0";
        break;
      case "/":
        currentState = "0/";
        displayState = "0\u00f7";
        break;
      case "*":
        currentState = "0*";
        displayState = "0\u00d7";
        break;
      case "-":
        currentState = "0-";
        displayState = "0-";
        break;
      case "+":
        currentState = "0+";
        displayState = "0+";
        break;
      default:
        currentState = char;
        displayState = modChar;
        break;
    }
  } else {
    currentState += char;
    displayState += modChar;
  }
  currentState = currentState.slice(0, 15);
  update(displayState);
}

document.addEventListener("DOMContentLoaded", () => {
  elements.history.textContent = localStorage.getItem("calcCache").slice(0, 14) || "0";
  elements.buttons.forEach((button) => {
    button.addEventListener("click", () => {
      switch (button.id) {
        case "key-5":
        case "key-6":
        case "key-7":
        case "key-9":
        case "key-10":
        case "key-11":
        case "key-13":
        case "key-14":
        case "key-15":
        case "key-17":
        case "key-18":
        case "key-19":
          addChar(button.textContent);
          break;
        case "key-4":
          addChar("/");
          break;
        case "key-8":
          addChar("*");
          break;
        case "key-12":
          addChar("-");
          break;
        case "key-16":
          addChar("+");
          break;
        case "key-1":
          currentState = "0";
          displayState = currentState;
          localStorage.setItem("calcCache", "0");
          update(displayState);
          break;
        case "key-2":
          currentState = currentState.slice(0, -1) || "0";
          displayState = currentState;
          update(displayState);
          break;
        case "key-3":
          currentState /= 100;
          currentState = currentState.toString();
          displayState += "%";
          saveState();
          displayState = currentState;
          update(displayState);
          break;
        case "key-20":
          currentState = math.evaluate(currentState).toString();
          currentState = currentState.slice(0, 16);
          saveState();
          displayState = currentState;
          update(displayState);
          break;
      }
    });
  });
});
