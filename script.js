const diff = document.getElementById("difficulty"),
    minefield = document.querySelector("main"),
    field = {
    easy: {squares: 81,flags: 10,},
    medium: {squares: 256,flags: 40,},
    hard: {squares: 484,flags: 100,},
};
function createField(size){
    minefield.replaceChildren();
    let tiles=[];
    const frag = document.createDocumentFragment();
    for(i=0;i<field[size].squares; i++) {
        const tile = document.createElement('div');
        tile.value = i;
        if (i%2!==0){tile.style.background = "rgb(73, 170, 255)";}
        frag.appendChild(tile);
        tiles.push(tile.value);
    }
    minefield.appendChild(frag);
    for(i=tiles.length-1;i>0;i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    let mines=tiles.slice(0,field[size].flags);
    console.log(mines);
    
    minefield.addEventListener('mouseover',(e)=>{e.target.style.background="#9fd2ff";})
    minefield.addEventListener('mouseout',(e)=>{e.target.style.background=e.target.value%2!==0?"#49aaff":"";})
}
createField(diff.value);
