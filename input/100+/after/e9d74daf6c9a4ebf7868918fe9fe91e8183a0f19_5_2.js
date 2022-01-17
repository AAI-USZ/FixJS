function(dir) {

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