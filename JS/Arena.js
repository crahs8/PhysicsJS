class Arena {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    
        // Bodies in the arena
        this.balls = [];

        this.gravity = 0;

        // Creating the DOM-element
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    // Creates a ball object and draws it to the canvas
    createBall(x, y, radius, mass) {
        this.balls.push(new Ball(this, x, y, radius, mass));
    }

    // Stuff to do every frame
    update() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.width, this.height)

        // Update all the bodies and redraw
        // Balls
        this.balls.forEach(ball => {
            if(this.gravity) ball.applyForce({x: 0, y: (ball.mass * this.gravity)});
            ball.move();
            ball.draw();
        });
    }

    startSimulation(frameRate) {
        this.interval = setInterval(this.update.bind(this), 1000/frameRate);
    }
}