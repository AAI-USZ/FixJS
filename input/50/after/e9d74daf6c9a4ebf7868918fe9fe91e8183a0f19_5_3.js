function () {



        var ref = this.target;
        if(ref.prevGridX) ref.gridRef.getItemAtXY(ref.prevGridX,ref.prevGridY).free=true;

        ref.go(ref.currDir);



      //  //console.log(ref.gridX,ref.gridY);

        //infected




    }