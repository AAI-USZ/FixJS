function(core, background, foreground, camera, scene) {
        this._super(core, background, foreground);
        var width = this.core.container.width(), 
            height = this.core.container.height();
        this.scene = scene || new THREE.Scene();
        this.camera = camera ||  new THREE.PerspectiveCamera(60, width / height, 1, 5000);
        this.camera.position.z = 1300;
        this.scene.add( this.camera );
        this.gameArea = { x: 0, y: 0, width: 970, height: 1485 };
        this.camera.position.x = 225 + this.gameArea.x + this.gameArea.width / 2;
        this.camera.position.y = this.gameArea.y + this.gameArea.height / 2 - 30;
        this.collisionTestStep = 1;
    }