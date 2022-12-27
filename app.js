let isDrawing = false;
let defaultColor = "grey";
const Pastel = ["rgb(245, 235, 224)", "rgb(240, 219, 219)", "rgb(219, 163, 154)"];
const SeaAndGreen = ["rgb(13, 24, 33)", "rgb(52, 73, 102)", "rgb(180, 205, 237)", "rgb(240, 244, 239)", "rgb(191, 204, 148)"];
const Eraser = ["grey"];
const pastels = {
  "Pastel": Pastel,
  "SeaAndGreen": SeaAndGreen,
  "Eraser": Eraser
}

let selectedPastel = pastels["Pastel"];

const container = document.querySelector(".container");
const gridNumberInput = document.querySelector("#grid-number");
const resetBtn = document.querySelector("#reset")
const dropdown = document.querySelector("#palette");
const gridResult = document.querySelector(".grid-result");
const palette = document.querySelector("#palette");

for(let color of Object.keys(pastels)) {
  let option = document.createElement("option");
  option.value = color;
  option.textContent = color;
  palette.append(option);
}




// setting default actions
gridNumberInput["value"] = "16"; // default grid number value
let val = gridNumberInput["value"];
gridResult.textContent = `${val} x ${val}`;
let grid = gridValue(gridNumberInput["value"]); // squared grid
container.style.gridTemplateColumns = `repeat(${gridNumberInput["value"]}, 1fr)`;
container.style.gridTemplateRows = `repeat(${gridNumberInput["value"]}, 1fr)`;
addingGrid(container)
drawfunction();


resetBtn.addEventListener("click", resetSketch)
window.addEventListener("reset", () => {
  // reset the dropdown as well
});


dropdown.addEventListener("change", (e) => {
  selectedPastel = pastels[e.target.value];
  resetDrawFunction();
  drawfunction();
});

gridNumberInput.addEventListener("change", (e) => {
  // if change
  let val = e.target["value"];
  if(Number(val) >= 10 && Number(val) <= 100) {
    grid = gridValue(val);
    addingGrid(container)
    container.style.gridTemplateColumns = `repeat(${gridNumberInput["value"]}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridNumberInput["value"]}, 1fr)`;
    resetDrawFunction();
    drawfunction();
    gridResult.textContent = `${val} x ${val}`;
  }
});



// functions
function generateColor(palette) {
  let randomNum = Math.floor(Math.random() * palette.length);
  return palette[randomNum];
}

function gridValue(gridNumberInputValue) {
  console.log(Number(gridNumberInputValue) ** 2);
  return Number(gridNumberInputValue) ** 2;
}

function addingGrid() {
  container.innerHTML = "";
  // default grid 16 x 16
  let temp = new DocumentFragment();
  for(let i = 0; i < grid; i++) {
    let div = document.createElement("div");
    div.classList.add("item");
    div.style.backgroundColor = defaultColor;
    div.setAttribute("draggable", false);
    temp.appendChild(div);
  }
  container.append(temp);
}

function drawfunction() {
  // dom
  let items = document.querySelectorAll(".item");

  items.forEach(item => {
    item.addEventListener("mousedown", setIsDrawing);

    item.addEventListener("mouseover", mouseover);

    item.addEventListener("mouseup", mouseup);
  });
}

function setIsDrawing() {
  isDrawing = true;
}

function mouseover(e) {
  if(isDrawing) {
    e.target.style.backgroundColor = generateColor(selectedPastel);
  }
}

function mouseup() {
  if(isDrawing) {
    isDrawing = false;
  }
}

function resetDrawFunction() {
  let items = document.querySelectorAll(".item");

  items.forEach(item => {
    item.removeEventListener("mousedown", setIsDrawing);

    item.removeEventListener("mouseover", mouseover);

    item.removeEventListener("mouseup", mouseup);
  });
}

function resetSketch() {
  let items = document.querySelectorAll(".item");
  items.forEach(item => {
    if(item.style.backgroundColor != defaultColor) {
      item.style.backgroundColor = defaultColor;  
    }
  });
}

