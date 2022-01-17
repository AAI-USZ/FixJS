function() {

        for (i in model.updateList) {
            model.updateList[i].update((365.0/this.fps)/this.speed);
        }
        this.time++;
        this.render();
    }