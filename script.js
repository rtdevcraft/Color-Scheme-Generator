const color1El = document.getElementById("color1");
const color2El = document.getElementById("color2");
const color3El = document.getElementById("color3");
const color4El = document.getElementById("color4");
const color5El = document.getElementById("color5");
const color1LabelEl = document.getElementById("color-1-label");
const color2LabelEl = document.getElementById("color-2-label");
const color3LabelEl = document.getElementById("color-3-label");
const color4LabelEl = document.getElementById("color-4-label");
const color5LabelEl = document.getElementById("color-5-label");
const formEl = document.querySelector("form");
const colorDivs = document.querySelectorAll(".color");
let baseColorSelector = document.getElementById("base");
let colorSchemeSelector = document.getElementById("scheme");
let timeoutId;

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let colorScheme = colorSchemeSelector.value;
  let baseColor = baseColorSelector.value;
  let baseColorWithoutHash = baseColor.replace("#", "").toUpperCase();
  getColorScheme(baseColorWithoutHash, colorScheme);
  removeClickedClassFromColorDivs();
});

colorDivs.forEach((colorDiv) => {
  colorDiv.addEventListener("click", (e) => {
    copyHexCode(e);
    colorDiv.classList.toggle("clicked");
    showToast("Hex code copied!");
  });
});

renderInitialColors();

function renderInitialColors() {
  const colors = ["#EA4821", "#EC5322", "#EF6523", "#F1852A", "#F1A830"];

  colorDivs.forEach((colorDiv, index) => {
    const color = colors[index];
    colorDiv.style.backgroundColor = color;
    colorDiv.querySelector("h2").textContent = color;
  });
}

function getColorScheme(baseColorWithoutHash, colorScheme) {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${baseColorWithoutHash}&mode=${colorScheme}&count=5`
  )
    .then((response) => response.json())
    .then((data) => {
      let colors = data.colors.map((color) => color.hex.value);
      renderColorScheme(colors);
      renderHexCodes(colors);
    });
}

function renderColorScheme(colors) {
  const colorEls = [color1El, color2El, color3El, color4El, color5El];
  colorEls.forEach((el, index) => {
    el.style.backgroundColor = colors[index];
  });
}

function renderHexCodes(colors) {
  const labelEls = [
    color1LabelEl,
    color2LabelEl,
    color3LabelEl,
    color4LabelEl,
    color5LabelEl,
  ];
  labelEls.forEach((el, index) => {
    el.textContent = colors[index];
  });
}

function copyHexCode(e) {
  const h2El = e.currentTarget.querySelector("h2");
  const hexCode = h2El.textContent.trim();
  navigator.clipboard
    .writeText(hexCode)
    .then(() => {
      console.log(`Copied ${hexCode} to clipboard`);
    })
    .catch((error) => {
      console.error("Unable to copy hex code:", error);
    });
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  toast.textContent = message;
  toast.style.display = "block";
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function removeClickedClassFromColorDivs() {
  colorDivs.forEach((colorDiv) => {
    colorDiv.classList.remove("clicked");
  });
}
