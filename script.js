const minefield = document.querySelector("main");
const field = {
    easy: {squares: 81,flags: 10,},
    medium: {squares: 252,flags: 40,},
    hard: {squares: 480,flags: 99,},
};
// const easy = 81, medium = 252, hard = 480;
const diff = document.getElementById("fieldSize").value;
console.log(diff);

for(i=0;i<diff; i++) {
    minefield.innerHTML+=`<div id="s${i}"></div>`;
    
}
document.querySelector("main").querySelectorAll("div").forEach((square,i)=>{
    if (i%2!==0){square.style.background = "rgb(73, 170, 255)";}
    square.addEventListener('mouseenter',(e)=>{
        e.target.style.background = "rgb(159, 210, 255)";
    });

    square.addEventListener('mouseleave', () => {
        if (i % 2 !== 0) {
            square.style.background = "rgb(73, 170, 255)";
        } else {
            square.style.background = "";
        }
    });
});
