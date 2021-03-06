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

        // Bounding rectangle used for finding mouse position
        this.boundingRect = this.canvas.getBoundingClientRect();

        // The chosen options in the UI
        this.options = {
            simulationStarted: false,
            type: "ball",
            density: 1
        };

        this.densityText = document.getElementById('densitytext');
        this.densitySlider =  document.getElementById('density');
        this.densitySlider.oninput = () => {
            this.options.density = Math.pow(10, this.densitySlider.value - 1);
            this.densityText.innerHTML = "Density: " + this.options.density;
        };

        // For when the user is dragging the mouse in order to create a body
        this.creatingBody = {
            creating: false,
            origin: new Vector2d(0, 0),
            current: new Vector2d(0, 0)
        };

        // Adding click event listeners
        this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
        this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    }

    // Creates a ball object and draws it to the canvas
    createBall(x, y, radius, density) {
        this.bodies.push(new Ball(this, x, y, radius, density));
    }
    createRectangle(x, y, width, height, density) {
        this.bodies.push(new Rectangle(this, x,  y, width, height, density));
    }

    // Event handler for mouse down
    mouseDown(evt) {
        // Stop the simulation
        this.stopSimulation();

        // Start creating a body
        const mouse = this.getLocalMousePos(evt);
        this.creatingBody.creating = true;
        this.creatingBody.origin = mouse;
        this.creatingBody.current = mouse;
    }

    // Event handler for mouse up
    mouseUp() {
        // Start simulation again if it was started before
        if(this.options.simulationStarted) this.startSimulation(this.frameRate);

        // Finish creating a body
        this.creatingBody.creating = false;
        const vector = this.creatingBody.current.subtract(this.creatingBody.origin);
        switch(this.options.type) {
            case "ball":
                const radius = vector.length;
                this.createBall(this.creatingBody.origin.x, this.creatingBody.origin.y,
                                radius, this.options.density);
                break;
            case "rectangle":
                this.createRectangle(this.creatingBody.origin.x, this.creatingBody.origin.y,
                                     vector.x, vector.y, this.options.density);
                break;
        }
    }

    // Event handler for mouse move
    mouseMove(evt) {
        if(this.creatingBody.creating) {
            // Draw the arena with the added body
            this.creatingBody.current = this.getLocalMousePos(evt);

            this.context.clearRect(0, 0, this.width, this.height);
            this.bodies.forEach(body => {
                body.draw();
            });
            this.drawOutline();
        }
    }

    // Takes a mouseEvent as input and outputs the
    // mouse's local position in the canvas
    getLocalMousePos(evt) {
        return new Vector2d(evt.clientX - this.boundingRect.left, evt.clientY - this.boundingRect.top);
    }  
    
    // Draws an outline used for creating bodies
    drawOutline() {
        const vector = this.creatingBody.current.subtract(this.creatingBody.origin);
        switch(this.options.type) {
            case "ball":
                const radius = vector.length;
                this.context.beginPath();
                this.context.arc(this.creatingBody.origin.x, this.creatingBody.origin.y,
                                 radius, 0, 2*Math.PI);
                this.context.stroke();
                break;
            case "rectangle":
                this.context.beginPath();
                this.context.rect(this.creatingBody.origin.x, this.creatingBody.origin.y,
                                  vector.x, vector.y);
                this.context.stroke();
                break;
        }
    }

    // Stuff to do every frame
    update() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.width, this.height);

        // Update all the bodies and redraw
        this.bodies.forEach((body, bodyIndex) => {
            // Downward gravity<
            if(this.downGravity) body.applyForce(new Vector2d(0, (body.mass * this.downGravity)));

            // Inter-body gravity
            if(this.interGravity) {
                this.bodies.forEach(otherBody => {
                    if(otherBody != body) {
                        const vector = body.vectorTo(otherBody);
                        const distance = vector.length;
                        const gForce = vector.scale(this.interGravity * body.mass * otherBody.mass / Math.pow(distance, 3));
                        body.applyForce(gForce);
                    }
                });
            }
            
            // Check for collisions, finds one collision pr. pair of colliding bodies
            for(let i = bodyIndex; i < this.bodies.length; i++) {
                const otherBody = this.bodies[i];
                if(otherBody != body && body.collidesWith(otherBody)) {
                    // Collision detected
                    console.log("Collision detected:", body, otherBody);
                }
            }
        });
        
        this.bodies.forEach(body => {
            body.move();
            body.draw();
        });
    }

    // Starts the simulation
    startSimulation(frameRate) {
        this.frameRate = frameRate;
        this.options.simulationStarted = true;
        this.interval = setInterval(this.update.bind(this), 1000/frameRate);
    }

    // Stops the simulation
    stopSimulation() {
        clearInterval(this.interval);
    }
}