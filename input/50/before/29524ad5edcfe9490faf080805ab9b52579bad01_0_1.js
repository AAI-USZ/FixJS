function (e) {
            if (
                this.drawHook
                && (this.drawHook() === false)
            ) return;

            this.draw();
            this.drawReady = true;
        }