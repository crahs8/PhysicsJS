let arena;

function init() {
    arena = new Arena(1000, 1000);
    arena.createBall(300, 300, 50);
    arena.gravity = 0.4;
}

function start() {
    arena.startSimulation(60);
}