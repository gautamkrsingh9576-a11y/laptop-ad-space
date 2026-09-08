const placements = {
  centre: [
    "01 / CENTRE PLACEMENT",
    "Front and centre.",
    "Ask about a central position on the laptop lid for your brand sticker."
  ],
  corner: [
    "02 / CORNER PLACEMENT",
    "A little corner. All yours.",
    "Ask about a corner position that gives your sticker its own place on the lid."
  ],
  flexible: [
    "03 / FLEXIBLE PLACEMENT",
    "Let’s find your fit.",
    "We can discuss a position that suits your logo and the available space."
  ]
};

document.querySelectorAll("[data-place]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-place]").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    const [label, title, description] =
      placements[button.dataset.place];

    document.getElementById("selection-label").textContent = label;
    document.getElementById("selection-title").textContent = title;
    document.getElementById("selection-description").textContent =
      description;
  });
});

document.getElementById("share").addEventListener("click", async () => {
  const status = document.getElementById("share-status");

  if (location.protocol === "file:") {
    status.textContent =
      "Website online hone ke baad iska link share kar sakte hain.";
    return;
  }

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Your brand. My laptop.",
        text: "Explore this brand-sticker advertising idea.",
        url: location.href
      });
      status.textContent = "";
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(location.href);
      status.textContent = "Website link copied!";
    } else {
      status.textContent =
        "Copy the website address from your browser to share it.";
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      status.textContent =
        "Copy the website address from your browser to share it.";
    }
  }
});