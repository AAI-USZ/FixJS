function() {
            this.customName.style["display"] = "none";
            this.customLabel.style["display"] = "none";

            this.divElement.addEventListener("click", this, false);
            this.imageElement.addEventListener("click", this, false);
            this.videoElement.addEventListener("click", this, false);
            this.canvasElement.addEventListener("click", this, false);
            this.customElement.addEventListener("click", this, false);

            this.elementPosition.disabled = true;
        }