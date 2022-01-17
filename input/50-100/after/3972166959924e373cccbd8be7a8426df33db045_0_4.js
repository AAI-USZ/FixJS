function (){
        for (var rowIdx in this.renderedRows){
            console.log('deRenderAllRows idx:'+rowIdx);
            this.deRenderRow(rowIdx);
        }
        console.log('deRenderAllRows taille de fin:'+this.nbProperties(this.renderedRows));
    }