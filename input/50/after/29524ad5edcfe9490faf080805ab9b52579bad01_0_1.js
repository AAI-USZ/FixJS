function () {
            if (
                this.drawHook
                && (this.drawHook() === false)
            ) return;

            this.draw();
        }