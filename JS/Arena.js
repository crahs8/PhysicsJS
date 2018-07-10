class Arena {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    
        // Bodies in the arena
        this.balls = [];

        this._gravity = 0;

        // Creating the DOM-element
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
    
    set gravity(g) {
        // Gives all bodies an accelration
        // Balls
        this.balls.forEach(ball => {
            ball.acceleration.y += (g - this._gravity);
        });
        this._gravity = g;
    }

    get gravity() {
        return this._gravity;
    }

    // Creates a ball object and draws it to the canvas
    createBall(x, y, radius) {
        this.balls.push(new Ball(this, x, y, radius));
        // Give the new ball gravity
        this.balls[this.balls.length - 1].acceleration.y += this._gravity;
    }

    // Stuff to do every frame
    update() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.width, this.height)

        // Update all the bodies and redraw
        // Balls
        this.balls.forEach(ball => {
            ball.move();
            ball.draw();
        });
    }

    startSimulation(frameRate) {
        this.interval = setInterval(this.update.bind(this), 1000/frameRate);
    }
}