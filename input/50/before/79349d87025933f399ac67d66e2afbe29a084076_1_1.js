function (time) {
            my.update();
            my.render();
            requestAnimationFrame(my.tick.bind(this));
        }