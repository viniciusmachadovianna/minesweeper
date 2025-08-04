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
const themeSelector = $('themeSelector');
let gameRunning = false;

function toggleElementVisibility(el=null){
  !el?$all('header,footer').forEach(el=>el.classList.toggle('hidden')):$q(el).classList.toggle('hidden')
}

function changeTheme(e) {
  const btn = e.target.closest('button');
    if (!btn) return;
    const selectedTheme = btn.dataset.theme;
    document.documentElement.setAttribute('data-theme', selectedTheme);
    themeSelector.querySelector('.active')?.classList.remove('active');
    btn.classList.add('active');
}

function revealSector(selectedSector) {
  if (!gameRunning) {
    gameRunning = true;
    startGame();
  }
  if (selectedSector.classList.contains('revealed') || selectedSector.classList.contains('flagged')) {return}

  selectedSector.classList.add('revealed');
  selectedSector.dataset.status = 'revealed';
}

function startGame(difficulty='test') {
  if(gameRunning) return
  gameRunning=true;
  tickTimer()
  let difficulties = {'test':[3,2],'easy':[9,10],'regular':[15,50],'hard':[25,100],'extreme':[35,200]};
  minefield.replaceChildren();
  const sectors = difficulties[difficulty][0]**2
  const mines = difficulties[difficulty][1];
  flagsLeft.textContent = mines;
  console.log(`Difficulty set to: ${difficulty} with ${sectors} sections and ${mines} mines`);
  for (let i = 0; i < sectors; i++) {
    createSector();
  }
}

function tickTimer() {
  if (!gameRunning) return;
  const currentTime = parseInt(timelapse.textContent) || 0;
  timelapse.textContent = currentTime + 1;
  setTimeout(tickTimer, 1000);
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
    sector.textContent = '';
    flagsLeft.textContent = parseInt(flagsLeft.textContent) + 1;

  } else {
    sector.classList.add('flagged');
    sector.textContent = '⚑';
    flagsLeft.textContent = parseInt(flagsLeft.textContent) - 1;

  }
}

window.onload=()=>{
  minefield.onclick=(e)=>revealSector(e.target)
  themeSelector.onclick=(e)=>{changeTheme(e)}
  minefield.oncontextmenu=(e)=>{e.preventDefault();flagSector(e.target)}
  btnStartGame.onclick=()=>startGame();
  btnToggleMinesLeft.onclick=()=>toggleElementVisibility('.flags')
  btnToggleTimelapse.onclick=()=>toggleElementVisibility('.time')
  btnToggleHUD.onclick=()=>toggleElementVisibility()
  btnChangeTheme.onclick=()=>toggleElementVisibility('#themeSelector');
}
