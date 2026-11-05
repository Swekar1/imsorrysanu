const apologyPage = document.querySelector("#apology-page");
const letterPage = document.querySelector("#letter-page");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const choices = document.querySelector("#choices");
const noHint = document.querySelector("#no-hint");
const openLetterButton = document.querySelector("#open-letter");
const loveLetter = document.querySelector("#love-letter");
const letterHeading = document.querySelector("#letter-heading");

function moveNoButton() {
  const choicesBounds = choices.getBoundingClientRect();
  const noBounds = noButton.getBoundingClientRect();
  const yesBounds = yesButton.getBoundingClientRect();
  const currentLeft = noBounds.left - choicesBounds.left;
  const currentTop = noBounds.top - choicesBounds.top;

  noButton.style.position = "absolute";
  const maxX = Math.max(0, choices.clientWidth - noButton.offsetWidth);
  const maxY = Math.max(0, choices.clientHeight - noButton.offsetHeight);
  const safeGap = 16;
  const positions = [];

  for (let top = 0; top <= maxY; top += 20) {
    for (let left = 0; left <= maxX; left += 20) {
      const noLeft = choicesBounds.left + left;
      const noTop = choicesBounds.top + top;
      const overlapsYes =
        noLeft < yesBounds.right + safeGap &&
        noLeft + noButton.offsetWidth > yesBounds.left - safeGap &&
        noTop < yesBounds.bottom + safeGap &&
        noTop + noButton.offsetHeight > yesBounds.top - safeGap;

      if (!overlapsYes) {
        positions.push({ left, top });
      }
    }
  }

  const movedPositions = positions.filter(({ left, top }) =>
    Math.hypot(left - currentLeft, top - currentTop) >= 100
  );
  const options = movedPositions.length ? movedPositions : positions;
  const destination = options[Math.floor(Math.random() * options.length)];

  if (destination) {
    noButton.style.left = `${destination.left}px`;
    noButton.style.top = `${destination.top}px`;
  }
  noHint.textContent = "The 'No' button is still a little shy...";
}

yesButton.addEventListener("click", () => {
  apologyPage.hidden = true;
  letterPage.hidden = false;
  letterHeading.focus();
});

noButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

openLetterButton.addEventListener("click", () => {
  const isExpanded = openLetterButton.getAttribute("aria-expanded") === "true";
  openLetterButton.setAttribute("aria-expanded", String(!isExpanded));
  openLetterButton.querySelector(".envelope-label").textContent = isExpanded
    ? "Open your letter"
    : "Close your letter";
  loveLetter.hidden = isExpanded;

  if (!isExpanded) {
    loveLetter.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});
