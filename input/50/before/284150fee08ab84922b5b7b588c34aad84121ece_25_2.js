function(){
        if(this.isActive){
            return true;
        }
        
        var activeSeries;
        return (activeSeries = this.activeSeries()) != null &&
               (activeSeries === this.acts.series.value);
    }