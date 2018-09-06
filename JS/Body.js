class Body {
    constructor(arena, x, y, density) {
        this.position = new Vector2d(x, y);
        this.velocity = new Vector2d(0, 0);
        this.density = density;
        this.arena = arena;
        this.ctx = this.arena.context;

    }

    // Calculates the magnitude of the velocity (speed)
    get speed() {
        return this.velocity.length;
    }

    // Sets the velocity if the speed is changed
    set speed(newSpeed) {
        this.velocity = this.velocity.scale(newSpeed / this.speed)
    }

    // Accelerates the body according to a force
    applyForce(force) {
        this.velocity = this.velocity.add(force.scale(1 / this.mass));
    }

    // Moves the body
    move() {
        this.position = this.position.add(this.velocity);
    }

    // Returns the vector that points to a body
    vectorTo(body) {
        return new Vector2d(body.center.x - this.center.x, body.center.y - this.center.y);
    }

    // Returns the distance between two bodies
    static distance(body1, body2) {
        const vector = body1.vectorTo(body2);
        return vector.length;
    }
}

class Ball extends Body {
    constructor(arena, x, y, radius, density) {
        super(arena, x, y, density);
        this.radius = radius;
        this.area = Math.PI * radius * radius;
        this.mass = density * this.area;

        console.log("The mass of the created body is", this.mass);
        this.draw();
    }

    get center() {
        return this.position;
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
            return (Body.distance(this, body) <= this.radius + body.radius);
        }
    }
}

class Rectangle extends Body {
    constructor(arena, x, y, width, height, density) {
        super(arena, x, y, density);
        this.width = width;
        this.height = height;
        this.area = width * height;
        this.mass = density * this.area;

        console.log("The mass of the created body is", this.mass);
        this.draw();
    }

    get center() {
        return this.position.add([this.width / 2, this.height / 2]);
    }

    // Draws the rectangle to the canvas
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.stroke();
    }
    // Checks if the Ball is colliding with a specified body
    collidesWith(body) {
        // Ball
        /*if(body instanceof Ball) {
            return (Body.distance(this, body) < this.radius + body.radius);
        }*/
        if(body instanceof Rectangle) {
            // Check if rectangles are to either side of each other
            if(body.position.x > (this.position.x + this.width) || this.position.x > (body.position.x + body.width))
                return false;
            if(body.position.y > (this.position.y + this.height) || this.position.y > (body.position.y + body.height))
                return false;
            return true;
        }
    }
}