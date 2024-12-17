const diff = document.getElementById("difficulty"),
    minefield = document.querySelector("main"),
    field = {
    easy: {squares: 81,flags: 10,},
    medium: {squares: 256,flags: 40,},
    hard: {squares: 484,flags: 100,},
};
function createField(difficulty){
    minefield.replaceChildren();
    const frag = document.createDocumentFragment();
    for(i=0;i<field[difficulty].squares; i++) {
        const tile = document.createElement('div');
        tile.value = i;
        // minefield.innerHTML+=`<div id="s${i}"></div>`;
        if (i%2!==0){tile.style.background = "rgb(73, 170, 255)";}
        frag.appendChild(tile);
    }
    minefield.appendChild(frag);
    let bombs = [];
    while(bombs.length <field[diff.value].flags){
        let randBomb = Math.floor(Math.random() * (field[diff.value].squares))+1;
        if (!bombs.includes(randBomb)) {bombs.push(randBomb);}
    }
    minefield.addEventListener('mouseover',(e)=>{
        e.target.style.background = "rgb(159, 210, 255)";
    })
    minefield.addEventListener('mouseout',(e)=>{
        e.target.style.background=e.target.value%2!==0?"rgb(73, 170, 255)":"";
    })
}
createField(diff.value);
