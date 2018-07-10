class Body {
    constructor(arena, x, y) {
        this.position = {x:x, y:y};
        this.velocity = {x:0, y:0};
        this.acceleration = {x:0, y:0};
        this.arena = arena;
        this.ctx = this.arena.context;
    }

    // Calculates the magnitude of the velocity (speed)
    get speed() {
        return Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
    }

    // Accelerates and moves the body
    move() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Ball extends Body {
    constructor(arena, x, y, radius) {
        super(arena, x, y);
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