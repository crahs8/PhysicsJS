class Body {
    constructor(arena, x, y, mass) {
        this.position = {x: x, y: y};
        this.velocity = {x: 0, y: 0};
        this.mass = mass;
        this.arena = arena;
        this.ctx = this.arena.context;
    }

    // Calculates the magnitude of the velocity (speed)
    get speed() {
        return Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
    }

    // Accelerates the body according to a force
    applyForce(force) {
        this.velocity.x += (force.x / this.mass);
        this.velocity.y += (force.y / this.mass);
    }

    // Moves the body
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Ball extends Body {
    constructor(arena, x, y, radius, mass) {
        super(arena, x, y, mass);
        this.radius = radius;

        this.draw();
    }

    // Draws the ball to the canvas
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        this.ctx.stroke();
    }
}