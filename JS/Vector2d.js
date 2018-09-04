class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    scale(factor) {
        return new Vector2d(this.x * factor, this.y * factor);
    }

    add(vec) {
        if(vec instanceof Vector2d) return new Vector2d(this.x + vec.x, this.y + vec.y);
        else return new Vector2d(this.x + vec[0], this.y + vec[1]);
    }

    subtract(vec) {
        if(vec instanceof Vector2d) return new Vector2d(this.x - vec.x, this.y - vec.y);
        else return new Vector2d(this.x - vec[0], this.y - vec[1]);
    }
}