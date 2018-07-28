let arena;

function init() {
    arena = new Arena(1000, 1000);
    arena.createBall(600, 600, 50, 120);

    // Gravity test
    arena.createBall(450, 300, 50, 1);
    arena.createBall(350, 500, 50, 3);
    arena.interGravity = 400;
    arena.bodies[0].velocity = {x: 0, y:0};
    arena.bodies[1].velocity = {x: 12, y:-5};
    arena.bodies[2].velocity = {x: -2, y:8};

    // Simulation of thrown ball
    //arena.bodies[0].velocity = {x: 10, y:-15};
    //arena.downGravity = 0.4;
}

function start() {
    arena.startSimulation(60);
}