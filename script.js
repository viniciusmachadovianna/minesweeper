const $ = (id) => document.getElementById(id);
const $q = (id) => document.querySelector(id);
const $all = (id) => document.querySelectorAll(id);

const minefield = $('minefield');
const sectors = $all('.sector');
const flagsLeft = $('flagsLeft');
const timelapse = $('timelapse');
const btnStartGame = $('start');
const btnToggleMinesLeft = $('toggleMinesLeft');
const btnToggleTimelapse = $('toggleTimelapse');
const btnToggleHUD = $('toggleHUD');
const btnChangeColor = $('changeColor');
const btnChangeTheme = $('changeTheme');

let gameRunning = false;

function toggleElementVisibility(el=null){
  !el?$all('header,footer').forEach(el=>el.classList.toggle('hidden')):$(el).classList.toggle('hidden')
}

function changeTheme() { //TODO add field colors
  const currentTheme = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
}

function revealsector(selectedSector) {
  selectedSector.style.backgroundColor = 'lightgray'; //TODO adj to field colors
  if (selectedSector.classList.contains('revealed') || selectedSector.classList.contains('flagged')) {return}

  selectedSector.classList.add('revealed');
  selectedSector.dataset.status = 'revealed'; //TODO revisit to use furthermore
}

function start(){ //TODO temp
  let difficulties = {'test':[3,2],'easy':[9,10],'regular':[16,50],'hard':[25,100],'extreme':[36,200]};
  const difficulty = prompt("Enter difficulty (test, easy, regular, hard, extreme): test, easy, regular, hard, extreme");
  if (difficulties[difficulty]) {
    startGame(difficulty);
  } else {
    alert("Invalid difficulty. Please try again.");
  }
}

function startGame(difficulty='regular') {
  let difficulties = {'test':[3,2],'easy':[9,10],'regular':[16,50],'hard':[25,100],'extreme':[36,200]};
  minefield.replaceChildren();
  console.log('Game started');
  const sectors = difficulties[difficulty][0]**2
  const mines = difficulties[difficulty][1];
  flagsLeft.textContent = `${mines} mines`;
  console.log(`Difficulty set to: ${difficulty} with ${sectors} plots of land and ${mines} mines`);
  for (let i = 0; i < sectors; i++) {
    createSector();
  }
}
function createSector() {
  const sector = document.createElement('div');
  sector.classList.add('sector');
  sector.dataset.status = 'unknown'; 
  minefield.appendChild(sector);
}
startGame('test')
function placeMines(difficulty='normal'){
  console.log('mines being placed...');
  console.log('to be implemented');
  
}
function generateMinefield(rows, cols, bombCount) {
  let grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  let positions = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push([r, c]);
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  for (let i = 0; i < bombCount; i++) {
    const [r, c] = positions[i];
    grid[r][c] = 'B';
  }
  return grid;
}
function demo(){
  console.log('Para fins de demonstração e testes, a solução de um jogo 9x9 com 10 minas é:');
  ;
  console.table(generateMinefield(9, 9, 10));
}
function flagSector(sector) {
  if (sector.classList.contains('flagged')) {
    sector.classList.remove('flagged');
    sector.textContent = ''; // Remove flag
  } else {
    sector.classList.add('flagged');
    sector.textContent = '⛿'; // Add flag symbol
  }
}
window.onload=()=>{
  minefield.onclick=(e)=>revealsector(e.target)
  minefield.oncontextmenu=(e)=>{e.preventDefault();flagSector(e.target)}
  btnStartGame.onclick=start;
  btnToggleMinesLeft.onclick=()=>toggleElementVisibility('flagsLeft')
  btnToggleTimelapse.onclick=()=>toggleElementVisibility('timelapse')
  btnToggleHUD.onclick=()=>toggleElementVisibility()
  btnChangeTheme.onclick=changeTheme;
}