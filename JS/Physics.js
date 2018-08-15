let arena;

function init() {
    arena = new Arena(1000, 700);
    arena.createBall(500, 350, 100, 3);

    // Gravity test
    arena.createBall(250, 50, 30, 1);
    arena.createBall(250, 450, 15, 1);
    arena.interGravity = 0.5;
    arena.bodies[0].velocity = {x: -0.27, y: 0.08};
    arena.bodies[1].velocity = {x: 8, y: -5};
    arena.bodies[2].velocity = {x: 5, y: 10};

    // Simulation of thrown ball
    //arena.bodies[0].velocity = {x: 10, y:-15};
    //arena.downGravity = 0.4;
}

function start() {
    arena.startSimulation(60);
}