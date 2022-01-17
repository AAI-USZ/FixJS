function(dir) {

        var tCell = this.gridRef.getItemAtXY(this.gridX,this.gridY+1).free;

        var animParams = {onComplete:this.calculateNextMove};



        //this.gridRef.getItemAtXY(this.gridX,this.gridY).drawWall();
        //this.gridRef unDrawWall

            switch(this.decideWhichWayGo(dir)) {

                case "LEFT":   animParams.x= (-S.C_WIDTH).toString();  this.gridX--;          break;
                case "RIGHT":   animParams.x= S.C_WIDTH.toString();  this.gridX++;            break;
                case "UP":   animParams.y= (-S.C_HEIGHT).toString(); this.gridY--;            break;
                case "DOWN":   animParams.y= S.C_HEIGHT.toString();   this.gridY++;           break;
            }

        this.gridRef.getItemAtXY(this.gridX,this.gridY).free=false




            TweenMax.to(this, S.ENEMY_SPEED,animParams);
        //console.log("step end *")
    }