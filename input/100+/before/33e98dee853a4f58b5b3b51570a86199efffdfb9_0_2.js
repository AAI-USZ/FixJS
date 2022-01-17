function(speed) {
        this.speed = speed;
        var spdTxt = speed.toString();
        if (spdTxt.length > 3) {
            spdTxt = spdTxt.substring(0, 3);
            if (spdTxt.charAt(spdTxt.length - 1) == '.') {
                spdTxt = spdTxt.substr(0, spdTxt.length - 1);
            }
        }
        spdTxt = mmap.zeroPad(spdTxt, 3, ' ');
        this.speedInst.setText(spdTxt);
        this.speedTape.setY(speed * 2);

        if (this.speedBug.isVisible()) {
            this.speedBug.setY(this._calcSpeedBugY());
        }
        this.layer.draw();
    }