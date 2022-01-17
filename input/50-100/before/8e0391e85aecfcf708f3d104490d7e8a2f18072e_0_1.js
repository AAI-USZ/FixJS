function(){
            var pos = this.transform.getPos();
            var size = this.scene.renderer.get('size');
            return new modula.Rect(pos.x,pos.y,size.x,size.y,'centered');
        }