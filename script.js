const diff = document.getElementById("difficulty"),
    flags = document.getElementById("flags"),
    minefield = document.querySelector("main"),
    menu = document.querySelector("header"),
    field = {
    easy: {squares: 81,flags: 10,},
    medium: {squares: 225,flags: 40,},
    hard: {squares: 441,flags: 100,},
};
function createField(difficulty){
    minefield.replaceChildren();
    const size = `${Math.sqrt(field[difficulty].squares)*25}px`;
    minefield.style.width = size;
    menu.style.width = size;
    let tiles=[];
    const frag = document.createDocumentFragment();
    for(i=0;i<field[difficulty].squares; i++) {
        const tile = document.createElement('div');
        tile.value = i;
        if (tile.value%2!==0){tile.className="dark";}
        frag.appendChild(tile);
        tiles.push(tile.value);
    }
    minefield.appendChild(frag);
    for(i=tiles.length-1;i>0;i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    let mines=tiles.slice(0,field[difficulty].flags);
    console.log(mines);
    flags.textContent = field[difficulty].flags;
    minefield.addEventListener('click',(e)=>{
        if(mines.includes(e.target.value)){
        console.log("contem")}
    })
}
document.addEventListener("contextmenu",(e)=>{
    if(e.target.tagName!='DIV' && e.target.tagName!='IMG'){return}
    e.preventDefault();
    if(e.target.tagName==='IMG'){e.target.remove();return}
    const flag = document.createElement('img');
    flag.src = "assets/flag.png";
    e.target.appendChild(flag);
})
createField(diff.value);
