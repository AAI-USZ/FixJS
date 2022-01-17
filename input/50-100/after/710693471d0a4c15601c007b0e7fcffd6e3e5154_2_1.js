function(renderer) {
        for (var i=0, iMax = this.entities.length; i<iMax; ++i) {
            var entity = this.entities[i];
            if (entity.model) {
                entity.model.visible = !entity.outOfBounds(0, -4);
            }
        }
        renderer.render( this.scene, this.camera );
    }