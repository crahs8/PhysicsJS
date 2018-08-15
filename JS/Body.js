class Body {
    constructor(arena, x, y, density) {
        this.position = {x: x, y: y};
        this.velocity = {x: 0, y: 0};
        this.density = density;
        this.arena = arena;
        this.ctx = this.arena.context;

    }

    // Calculates the magnitude of the velocity (speed)
    get speed() {
        return Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
    }

    // Sets the velocity if the speed is changed
    set speed(newSpeed) {
        // Saving as const, since speed is calculated each time this.speed is called
        const currSpeed = this.speed;
        this.velocity.x *= newSpeed / currSpeed;
        this.velocity.y *= newSpeed / currSpeed;
    }

    // Accelerates the body according to a force
    applyForce(force) {
        this.velocity.x += force.x / this.mass;
        this.velocity.y += force.y / this.mass;
    }

    // Moves the body
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    // Returns the vector that points to a body
    vectorTo(body) {
        let x = body.center.x - this.center.x;
        let y = body.center.y - this.center.y;
        return {x: x, y: y};
    }

    // Returns the distance between two bodies
    static distance(body1, body2) {
        let rx = body1.center.x - body2.center.x;
        let ry = body1.center.y - body2.center.y;
        return Math.sqrt(Math.pow(rx, 2) + Math.pow(ry, 2));
    }
}

class Ball extends Body {
    constructor(arena, x, y, radius, density) {
        super(arena, x, y, density);
        this.radius = radius;
        this.center = this.position;
        this.mass = density * this.area;

        console.log("The mass of the created body is", this.mass);
        this.draw();
    }

    get area() {
        return Math.PI * Math.pow(this.radius, 2);
    }
   
    // Draws the ball to the canvas
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        this.ctx.stroke();
    }

    // Checks if the Ball is colliding with a specified body
    collidesWith(body) {
        // Ball
        if(body instanceof Ball) {
            return (Body.distance(this, body) < this.radius + body.radius);
        }
    }
}