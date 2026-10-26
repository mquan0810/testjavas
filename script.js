"use strict";

// Final project: interactive photo gallery with mouse and keyboard access.
// The HTML figures deliberately have no tabindex: the load handler adds it.

const gallery = document.getElementById("gallery");
const figures = gallery.querySelectorAll(".gallery-card");
const featuredImage = document.getElementById("featured-image");
const featuredHeading = document.getElementById("featured-heading");
const featuredDescription = document.getElementById("featured-description");
const featuredCounter = document.getElementById("featured-counter");
const galleryStatus = document.getElementById("gallery-status");

// Called when the mouse enters a figure or the keyboard focuses it.
function updatePreview(event) {
  showPhoto(event.currentTarget);
}

function showPhoto(figure) {
  const thumbnail = figure.querySelector("img");
  const caption = figure.querySelector(".gallery-card__title");

  if (!thumbnail || !caption) return;

  featuredImage.src = thumbnail.src;
  featuredImage.alt = thumbnail.alt;
  featuredHeading.textContent = caption.textContent;
  featuredDescription.textContent = figure.dataset.description;
  featuredCounter.textContent = figure.dataset.number + " / 06";
  galleryStatus.textContent = "Now viewing " + caption.textContent + ".";

  for (let i = 0; i < figures.length; i++) {
    figures[i].classList.toggle("is-active", figures[i] === figure);
  }
}

// Called when the mouse leaves or a figure loses keyboard focus.
function resetPreview(event) {
  // Keep the focused photo selected if the mouse happens to move away.
  if (event.type === "mouseleave" && event.currentTarget.contains(document.activeElement)) {
    return;
  }
  // Keep the hovered photo selected if keyboard focus changes elsewhere.
  if (event.type === "blur" && event.currentTarget.matches(":hover")) {
    return;
  }
  showPhoto(figures[0]);
}

// Step 8/9 of the assignment: run on page load and add tabindex with a for loop.
function addTabFocus() {
  console.log("Gallery loaded: assigning tabindex=0 and registering events.");

  for (let i = 0; i < figures.length; i++) {
    figures[i].setAttribute("tabindex", "0");

    // Mouse events (keep these when adding keyboard events).
    figures[i].addEventListener("mouseover", updatePreview);
    figures[i].addEventListener("mouseleave", resetPreview);

    // Keyboard focus events.
    figures[i].addEventListener("focus", updatePreview);
    figures[i].addEventListener("blur", resetPreview);
  }
}

window.addEventListener("load", addTabFocus);
