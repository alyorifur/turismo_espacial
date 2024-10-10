const size = 100;
let columns = Math.floor(document.documentElement.clientWidth / size),
    rows = Math.floor(document.documentElement.clientHeight / size),
    toggled = true;

let grid = document.querySelector(".grid");

function toggle() {
    toggled = !(toggled);
    grid.classList.toggle("toggled");
}

let bottom_text = document.querySelector(".initial-text");

function handleClick(index) {
    toggle();
    anime({
        targets: ".tile",
        opacity: toggled ? 1 : 0.05,
        delay: anime.stagger(150, {
            grid: [columns, rows],
            from: index
        })
    })
    bottom_text.style.setProperty("opacity", 0);
}

function createTile(index) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.opacity = toggled ? 1 : 0.05;

    tile.onclick = e => handleClick(index);

    return tile;
}

function createTiles(quantity) {
    Array.from(Array(quantity)).map((tile, index) => {
        grid.appendChild(createTile(index));
    })
}

function refreshGrid() {
    grid.innerHTML = "";
    
    columns = Math.floor(document.documentElement.clientWidth / size),
    rows = Math.floor(document.documentElement.clientHeight / size);

    grid.style.setProperty("--columns", columns);
    grid.style.setProperty("--rows", rows);

    createTiles(rows * columns);
}

refreshGrid();
window.onresize = () => refreshGrid();