function (cachedCanvas) {
        this.cachedCanvas=cachedCanvas;

        //update the current region from the cached / this could potentially do zooming too
        this.cc.clearRect(0,0,this.width, this.height);
        
        var zoomfactor=10 || this.zoomfactor;

        this.xx=this.xx+(this.cursorStep);


        if(~~(this.xx)<~~(zoomfactor*this.width/2)){
            this.cc.drawImage(this.cachedCanvas,0,0,(~~(zoomfactor*this.width/2+this.xx)-1),this.height,~~(this.width/2-this.xx/zoomfactor),0,~~(this.width/2+this.xx/zoomfactor)-1,this.height);

        }
        else{
            this.cc.drawImage(this.cachedCanvas,~~(this.xx-zoomfactor*this.width/2),0,zoomfactor*this.width,this.height,0,0,this.width,this.height);
        }

        //deal with the ending


    }