function(scene) {
        if(this.currentScene) {
            this.currentScene.remove( this.currentCamera );
        }
        this.currentScene = scene;
        this.currentScene.add( this.currentCamera );
}