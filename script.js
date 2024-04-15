const sumBtn = document.querySelector("#sumBtn");
const loaderDivs = document.querySelectorAll("#ldsSpinner div");

const inputs = document.querySelectorAll("input[type=number]");

const MAX_LOADING_INTERVAL = 5 * 1000; //counted in milliseconds
// Remove button, show loader, and show image afterwards when "Calculate sum" button is clicked
sumBtn.addEventListener("click", (e) => {
  //make sure the user entered numbers in the input fields
  let contiue = false;
  inputs.forEach((i) => {
    if (i.value === "") {
      contiue = false;
    } else {
      contiue = true;
    }
  });
  // if not alert user
  if (contiue === false) {
    window.alert("Please enter numbers to proceed");
    return;
  }

  e.target.remove();
  //get random interval and show loader
  loaderDivs.forEach((i) => {
    i.style.display = "block";
  });
  //hide loader and start loading image after random interval time passes
  let randomInterval = Math.floor(Math.random() * MAX_LOADING_INTERVAL);
  setTimeout(() => {
    loaderDivs.forEach((i) => {
      i.style.display = "none";
    });
    slowLoadImage();
  }, randomInterval);
});

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./img/image.jpg";
img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;
};

const DRAWING_INTERVAL = 10; //counted in milliseconds
// Simulate slow loading by drawing the image gradually
function slowLoadImage() {
  const drawInterval = setInterval(drawImageLineByLine, DRAWING_INTERVAL);
  let yPos = 0;

  function drawImageLineByLine() {
    ctx.drawImage(img, 0, yPos, canvas.width, 1, 0, yPos, canvas.width, 1);
    yPos++;
    if (yPos >= canvas.height) {
      clearInterval(drawInterval);
    }
  }
}
