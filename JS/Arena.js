class Arena {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    
        // Bodies in the arena
        this.bodies = [];

        // Downward gravity
        this.downGravity = 0;

        // Inter-body gravity
        this.interGravity = 0;

        // Creating the DOM-element
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    // Creates a ball object and draws it to the canvas
    createBall(x, y, radius, mass) {
        this.bodies.push(new Ball(this, x, y, radius, mass));
    }

    // Stuff to do every frame
    update() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.width, this.height)

        // Update all the bodies and redraw
        this.bodies.forEach(body => {
            // Downward gravity
            if(this.downGravity) body.applyForce({x: 0, y: (body.mass * this.gravity)});

            // Inter-body gravity
            if(this.interGravity) {
                this.bodies.forEach(otherBody => {
                    if(otherBody != body) {
                        let distance = Body.distance(body, otherBody);
                        let vector = body.vectorTo(otherBody);
                        let gForce = {x: (this.interGravity * body.mass * otherBody.mass * vector.x / Math.pow(distance, 3)),
                                      y: (this.interGravity * body.mass * otherBody.mass * vector.y / Math.pow(distance, 3))};
                        body.applyForce(gForce);
                    }
                });
            }
        });
        this.bodies.forEach(body => {
            body.move();
            body.draw();
        });
    }

    startSimulation(frameRate) {
        this.interval = setInterval(this.update.bind(this), 1000/frameRate);
    }
}