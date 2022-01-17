function() {

        if (this.time > 20) {
            this.time = 0;
            this.removeCurve(0);

            this.removeCurve(1);

            if (this.sphere.length == 1) {
                this.addCurve(0, this.curve, this.calcCurve(-1, this.name+"Planet"), colors["Path"]);
            }
            else {
                this.addCurve(0, this.sphere[0].curve, this.calcCurve(0, this.name+"Planet"), colors["Path"]);
            }

              
            this.addCurve(1, this.sphere[1].curve, this.calcCurve(1, this.name+"Planet"), colors["Hippo"]);

        }
        for (i in model.updateList) {
            model.updateList[i].update(this.speed);
        }
        this.time++;
        this.render();
    }