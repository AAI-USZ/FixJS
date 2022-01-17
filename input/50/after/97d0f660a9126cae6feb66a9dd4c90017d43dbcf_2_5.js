function(scene) {
//        if(this.currentScene) {
//            this.currentScene.remove( this.model.getCamera() );
//        }
        var
        cam = this.model.getCamera();        
        this.currentScene = scene;
        this.model.setCamera(cam);
//        this.currentScene.add( this.model.getCamera() );
}