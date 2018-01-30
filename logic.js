var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	//mode button event listeners
	setModeButtonListeners();
	//square event listeners
	setSquareListeners();
	//reset status of game
	reset();

}

resetButton.addEventListener("click", function() {
	reset();
});

function changeColors(color) {
	for (var i = 0; i < squares.length; ++i) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//make array with random colors with num size
function generateRandomColors(num) {
	var arr = [];

	for (var i = 0; i < num; ++i) {
		arr.push(randomColor());
	}

	return arr;
}

//make one random color
function randomColor() {
	//red
	var red = Math.floor(Math.random() * 256);
	
	//green
	var green = Math.floor(Math.random() * 256);

	//blue
	var blue = Math.floor(Math.random() * 256);

	//"rgb(red, green, blue)"
	return "rgb(" + red + ", " + green + ", " + blue +")";
}

function reset() {
	colors = generateRandomColors(numSquares);
	//pick new color
	pickedColor = pickColor();
	//change display to picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";

	//new colors to display
	for (var i = 0; i < squares.length; ++i) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}

	h1.style.backgroundColor = "steelblue";
	
}

function setModeButtonListeners() {
	for (var i = 0; i < modeButtons.length; ++i) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			if (this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			reset();
		});
	}
}

function setSquareListeners() {
	for (var i = 0; i < squares.length; ++i) {
		//click listeners for all squares
		squares[i].addEventListener("click", function() {
			//the color of the square user clicked
			var clickedColor = this.style.backgroundColor;
			//compare color to picked color
			if(clickedColor === pickedColor) {
				 messageDisplay.textContent = "Correct!";
				 resetButton.textContent = "Play Again?"
				 changeColors(clickedColor);
				 h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again";
			}
		});
	}
}