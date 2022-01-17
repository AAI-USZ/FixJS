function() {
        // content
        this.content = document.createElement('div');
        this.content.style.position = 'relative';
        this.content.style.display = 'inline-block';
        this.content.className = 'kineticjs-content';
        this.attrs.container.appendChild(this.content);

        this.bufferCanvas = new Kinetic.Canvas({
            width: this.attrs.width,
            height: this.attrs.height
        });
        this.pathCanvas = new Kinetic.Canvas({
            width: this.attrs.width,
            height: this.attrs.height
        });
        this.pathCanvas.strip();
        this._resizeDOM();
    }