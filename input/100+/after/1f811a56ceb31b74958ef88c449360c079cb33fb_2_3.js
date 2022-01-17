function(goodGuys,badGuys, stage)
    {
        this.Break();
        announcer_.Release();
        if(!!match_)
            match_.Release();
        speed_ = CONSTANTS.NORMAL_SPEED;
        var goodGuys = goodGuys;
        var badGuys = badGuys;
        var stage = stage;

        if(!!charSelect_)
        {
            goodGuys = goodGuys || charSelect_.GetGoodGuys();
            badGuys = badGuys || charSelect_.GetBadGuys();
            stage = stage || charSelect_.GetStage();

            charSelect_.Release();
        }

        match_ = new Match();
        announcer_.SetMatch(match_);
        this.Init();
        this.InitDOM();
        this.PreloadTextImages();

        managed_ = match_;

        match_.stage_.Set(stage);
        match_.Start(goodGuys,badGuys);
        isInitialized_ = true;
        frame_ = 0;
        this.RunGameLoop();
    }