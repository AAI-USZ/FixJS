function(start, node) {
        curvePos = [];
        oldAngle = [];
        oldRotate = [];
        step = 0;

        // save axis
        for (var i = 0; i <= start; i++) {
            oldAngle[i] = this.sphere[i].getAxisAngle();
            oldRotate[i] = this.sphere[i].getRotateAngle();
            this.sphere[i].setAxisAngle(0.0);
            this.sphere[i].setRotateAngle(0.0);
        }

        for (var i = start + 1; i < this.sphere.length; i++) {
            oldRotate[i] = this.sphere[i].getRotateAngle();
            this.sphere[i].update(-10.0);
            step += Math.abs(this.sphere[i].getStep());
        }

        for (var j = 0; j < 80; j++) {
            for (var i = start + 1; i < this.sphere.length; i++) {
                this.sphere[i].update(15.0 / step);
            }
            pos = getNodePos(node);
            curvePos.push(pos);
        }
        // restore axis
        for (var i = 0; i <= start; i++)
            this.sphere[i].setAxisAngle(oldAngle[i]);

        // restore rotation
        for (var i = 0; i < this.sphere.length; i++)
            this.sphere[i].setRotateAngle(oldRotate[i]);


        return curvePos;
    }