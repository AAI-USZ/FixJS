function () {
        this._frames++;
        this._accumDt += this._deltaTime;
        if(this._displayStats){
            if(this._FPSLabel && this._SPFLabel && this._drawsLabel){
                if (this._accumDt > cc.DIRECTOR_FPS_INTERVAL) {
                    this._SPFLabel.setString(this._secondsPerFrame.toFixed(3));

                    this._frameRate = this._frames / this._accumDt;
                    this._frames = 0;
                    this._accumDt = 0;

                    this._szFPS = ('' + this._frameRate.toFixed(1));
                    this._FPSLabel.setString(this._szFPS);

                    this._drawsLabel.setString((0|cc.g_NumberOfDraws).toString());
                }
                this._FPSLabel.visit();
                this._SPFLabel.visit();
                this._drawsLabel.visit();
            }else{
                this._createStatsLabel();
            }
        }
        cc.g_NumberOfDraws = 0;
    }