function Button(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "white";
    this.pressed = false;
    this.hovered = false;

    // run every iteration of the main loop, determines which functions to run depending on mouse pos and action
    this.update = function() {
        if (this.mouseOver()) {
            if (gameScreen.clicked && !this.pressed) {
                this.pressed = true;
                this.onClick();
            } else if (!this.hovered) {
                this.hovered = true;
                this.onHover();
            }
        } else if (this.hovered && !this.pressed) {
            this.hovered = false;
            this.onUnHover();
        }
        if (!gameScreen.pressed && this.pressed) {
            this.pressed = false;
            this.hovered = false;
            this.onRelease();
        }
    }

    this.draw = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        // ctx.strokeStyle = "black";
        // ctx.strokeRect(this.x, this.y, this.w, this.h);
    }

    this.mouseOver = function() {
        return (gameScreen.x >= this.x && gameScreen.x <= this.x + this.w && gameScreen.y >= this.y && gameScreen.y <= this.y + this.h);
    }

    // run when first hovering over the button
    this.onHover = function() {
        this.color = "grey";
    }

    // run when no longer hovering over button (if button is not pressed)
    this.onUnHover = function() {
        this.color = "white";
    }

    // run when first clicking the button
    this.onClick = function() {
        this.color = "black";
    }

    // run when releasing the button (position of mouse does not matter, can release from anywhere)
    this.onRelease = function() {
        this.color = "white";
    }

    // adds button to the rendered screen
    this.addToScreen = function() {
        entityList.push(this);
    }

    this.reset = function() {

    }
}