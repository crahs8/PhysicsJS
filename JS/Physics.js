let arena;

function init() {
    arena = new Arena(1000, 700);
    arena.createBall(500, 350, 100, 3);

    // Gravity test
    arena.createBall(250, 50, 30, 1);
    arena.createBall(250, 450, 15, 1);
    arena.interGravity = 0.5;
    arena.bodies[0].velocity = new Vector2d(-0.27, 0.08);
    arena.bodies[1].velocity = new Vector2d(8, -5);
    arena.bodies[2].velocity = new Vector2d(5, 10);

    // Simulation of thrown ball
    //arena.bodies[0].velocity = new Vector2d(10, -15);
    //arena.downGravity = 0.4;
}

function start() {
    arena.startSimulation(60);
}