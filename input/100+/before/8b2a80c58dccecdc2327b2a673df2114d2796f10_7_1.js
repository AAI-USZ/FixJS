function() {
        
        var params = this.state;
        //TODO: better merge
        for(var i in this.sphere) { 
          if(this["getAxisAngle"+i])   params.sphere[i-1].AxisAngle = this["getAxisAngle"+i]();
          if(this["getRotateStart"+i]) params.sphere[i-1].RotateStart = this["getRotateStart"+i]();
          if(this["getSpeed"+i])       params.sphere[i-1].Speed = this["getSpeed"+i]();

        }
        
        params.showStars = this.getShowStars();
        params.showPath = this.getShowPath();
        params.showHippo = this.getShowHippo();

        params.sunDist = this.sun.getDist();
        params.showSun = this.sun.getEnabled();
        params.sunSpeed = this.getSunSpeed();

        params.betaRotate = this.planet.getBeta();
        params.color = this.planet.getShade();

        return params;
    }