const bottomJaw = document.getElementById("bottom-skull");
const skullContainer = document.getElementById("skull-container");
const eyes = document.querySelectorAll(".eyes");
function mouseOver() {
	bottomJaw.style.animation = "openMouth 1s forwards";
	input0.style.animation = "showInput 1s forwards";
}
document.body.addEventListener("dblclick", () => {
	mouseOut();
});
function mouseOut() {
	bottomJaw.style.animation = "closeMouth 1s forwards";
	input0.style.animation = "hideInput 1s forwards";
}
skullContainer.onmouseover = function () {
	mouseOver();
};
skullContainer.onmouseout = function () {
	mouseOut();
};
eyes.forEach((eye, index) => {
	setTimeout(() => {
		eyes[index].style.animation = " eyes 10s linear 2s forwards";
	}, 4000);
});
