function(delta) {
        var state = this;
        if (!(state.frame % 30)) {
            this.add(new Enemy({
                x: Math.random() * state.gameArea.width,
                y: state.gameArea.height,
                xSpeed: -(Math.random() * 10) + 5,
                ySpeed: 5,
                scale: 2.5,
                angle: 180,
                image: 'characters/marisa.png',
                tasks: [ addCircle ]
            }));
        }
    }