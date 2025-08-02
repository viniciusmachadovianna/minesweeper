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

function changeTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
}

function revealSector(selectedSector) {
  selectedSector.style.backgroundColor = 'lightgray';
  if (selectedSector.classList.contains('revealed') || selectedSector.classList.contains('flagged')) {return}

  selectedSector.classList.add('revealed');
  selectedSector.dataset.status = 'revealed';
}

function startGame(difficulty='test') {
  let difficulties = {'test':[3,2],'easy':[9,10],'regular':[16,50],'hard':[25,100],'extreme':[36,200]};
  minefield.replaceChildren();
  console.log('Game started');
  const sectors = difficulties[difficulty][0]**2
  const mines = difficulties[difficulty][1];
  flagsLeft.textContent = `${mines} mines`;
  console.log(`Difficulty set to: ${difficulty} with ${sectors} sections and ${mines} mines`);
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
  minefield.onclick=(e)=>revealSector(e.target)
  minefield.oncontextmenu=(e)=>{e.preventDefault();flagSector(e.target)}
  btnStartGame.onclick=()=>startGame();
  btnToggleMinesLeft.onclick=()=>toggleElementVisibility('flagsLeft')
  btnToggleTimelapse.onclick=()=>toggleElementVisibility('timelapse')
  btnToggleHUD.onclick=()=>toggleElementVisibility()
  btnChangeTheme.onclick=changeTheme;
}
