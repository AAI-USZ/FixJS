function(window) {

    var p = Enemy.prototype;

    function Enemy() {
        this.initialize();
    };

    Enemy.prototype = new Container();

    Enemy.prototype.allowAnimation = false;

    Enemy.prototype.Container_initialize = Enemy.prototype.initialize;	//unique to avoid overiding base class

    Enemy.prototype.gridX=0;
    Enemy.prototype.gridY=0;

    Enemy.prototype.prevGridX;
    Enemy.prototype.prevGridY;

    Enemy.prototype.gridRef=null;

    Enemy.prototype.initGridPos=new Point(0,0);

    Enemy.prototype.currDir="RIGHT";
    Enemy.prototype.prevDir;

    Enemy.prototype.initialize = function() {
        this.allowAnimation=true;

        var rfBlock = new RFUIBlock();
        this.addChild(rfBlock);
        rfBlock.setSize(S.C_WIDTH, S.C_HEIGHT);



    };

    Enemy.prototype.placeHere = function(x,y) {

        this.initGridPos.x=x;
        this.initGridPos.y=y;

        this.x=this.initGridPos.x*S.C_WIDTH;
        this.gridX=this.x/S.C_WIDTH;

        this.y=this.initGridPos.y* S.C_HEIGHT;
        this.gridY=this.y/S.C_HEIGHT;

        this.cache(0,0, S.C_WIDTH, S.C_HEIGHT)

    }

    Enemy.prototype.go = function(dir) {

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
    };


    function getHandler(n) {
        return function() {
            alert( 'You clicked on: ' + n );
        };
    }


    Enemy.prototype.decideWhichWayGo  = function(dir) {

        var result = dir;

        var rArr = this.checkFree();

        //console.log("attempting to go:",result, "but can go: ",rArr)


        var found = false;
        for (var i in rArr) {
                if (result==rArr[i]) {
                    //console.log("deciding to go:", result)
                    var found = true;
                }
        }

        if(!found) {

            var pickRandom=rArr[Rndm.integer(rArr.length)];


            //decide here which one sticks

            result=pickRandom;

            //console.log("deciding to go:", result)

        }


        this.prevGridX=this.gridX;
        this.prevGridY=this.gridY;

        if(!this.prevDir) {this.prevDir=result} else {this.prevDir=this.currDir};
        this.currDir=result;

        //console.log("step start ***********")
        //console.log("curr",this.currDir,"prev",this.prevDir)


        return result
    }

    Enemy.prototype.checkFree =function () {

            var result = [];
            if (this.gridRef.getItemAtXY(this.gridX+1,this.gridY).free) result.push("RIGHT");
            if (this.gridRef.getItemAtXY(this.gridX-1,this.gridY).free) result.push("LEFT");
            if (this.gridRef.getItemAtXY(this.gridX,this.gridY-1).free) result.push("UP");
            if (this.gridRef.getItemAtXY(this.gridX,this.gridY+1).free) result.push("DOWN");

        return result;
    }

    Enemy.prototype.checkRight =function () {
        return this.gridRef.getItemAtXY(this.gridX+1,this.gridY).free
    };

    Enemy.prototype.checkDown =function () {
        return this.gridRef.getItemAtXY(this.gridX,this.gridY+1).free
    };

    Enemy.prototype.checkLeft =function () {
        return this.gridRef.getItemAtXY(this.gridX-1,this.gridY).free
    };

    Enemy.prototype.checkUp =function () {
        return this.gridRef.getItemAtXY(this.gridX,this.gridY-1).free
    };



    Enemy.prototype.animationOver = function() {
        //console.log(this.prevGridX,"s");
        //
        this.calculateNextMove();
    };

    Enemy.prototype.calculateNextMove = function () {



        var ref = this.target;
        if(ref.prevGridX) ref.gridRef.getItemAtXY(ref.prevGridX,ref.prevGridY).free=true;

        ref.go(ref.currDir);



      //  //console.log(ref.gridX,ref.gridY);

        //infected




    }

    window.Enemy = Enemy;

}