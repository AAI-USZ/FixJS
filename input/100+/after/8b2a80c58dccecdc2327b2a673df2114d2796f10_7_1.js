function() {
        
        var 
        params = { 
            model: this.name,
            viewParams : {},
            params: {}
        };
       
        params.params =  this.state;
        
        //TODO: better merge
        for(var i in this.sphere) { 
          if(this["getAxisAngle"+i])   params.params.sphere[i-1].AxisAngle = this["getAxisAngle"+i]();
          if(this["getRotateStart"+i]) params.params.sphere[i-1].RotateStart = this["getRotateStart"+i]();
          if(this["getSpeed"+i])       params.params.sphere[i-1].Speed = this["getSpeed"+i]();

        }
        params.params.sunSpeed = this.getSunSpeed();
        params.params.betaRotate = this.planet.getBeta();        
        
        params.viewParams.showStars = this.getShowStars();
        params.viewParams.showPath = this.getShowPath();
        params.viewParams.showHippo = this.getShowHippo();
        params.viewParams.sunDist = this.sun.getDist();
        params.viewParams.showSun = this.sun.getEnabled();
        params.viewParams.color = this.planet.getShade();

        return params;
    }