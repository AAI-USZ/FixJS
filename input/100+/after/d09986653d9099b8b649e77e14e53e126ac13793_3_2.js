function(ignoreMusic)
    {
        this.GetStage().Start();
        var moveStageX          = function(thisValue,players) { return function(amount,dontOverrideSign) { for(var i = 0; i < players.length;++i) {amount = thisValue.GetStage().ScrollX(amount,this,players[i],thisValue,dontOverrideSign);}; return amount; } };
        var fixX                = function(thisValue,players) { return function(amount) {thisValue.GetPhysics().FixX(amount,this,false,true);  return 0; } };
        var moveX               = function(thisValue,players) { return function(amount) {amount = thisValue.GetStage().ScrollX(amount,this,null,thisValue); thisValue.GetPhysics().MoveX(amount,this,false,true); return 0; } };
        var moveY               = function(thisValue,players) { return function(amount) {amount = thisValue.GetPhysics().MoveY(amount,this); return 0; } };
        var moveToBack          = function(thisValue,players) { return function() { for(var i = 0; i < players.length;++i) {players[i].MoveToBack(true);} } }
        var moveToFront         = function(thisValue,players) { return function() { for(var i = 0; i < players.length;++i) {players[i].MoveToFront(true);} } }
        var projectileMoved     = function(thisValue,players) { return function(id,x,y) { for(var i = 0; i < players.length;++i) { players[i].SetAllowBlockFromProjectile(thisValue.GetGame().GetCurrentFrame(),true,id,x,y); } } }
        var projectileGone      = function(thisValue,players) { return function(id)     { for(var i = 0; i < players.length;++i) { players[i].SetAllowBlockFromProjectile(thisValue.GetGame().GetCurrentFrame(),false,id); } } }
        var startAttack         = function(thisValue,players) { return function(id) { for(var i = 0; i < players.length;++i) { players[i].SetAllowBlock(id,thisValue.GetGame().GetCurrentFrame(),true,this.GetMidX(),this.GetMidY()); } } }
        var endAttack           = function(thisValue,players) { return function(id) { for(var i = 0; i < players.length;++i) { this.Flags.Combat.Remove(COMBAT_FLAGS.CAN_BE_BLOCKED); players[i].SetAllowBlock(id,thisValue.GetGame().GetCurrentFrame(),false); } } }
        var startAirAttack      = function(thisValue,players) { return function(id) { for(var i = 0; i < players.length;++i) { players[i].SetAllowAirBlock(id,thisValue.GetGame().GetCurrentFrame(),true,this.GetMidX(),this.GetMidY()); } } }
        var endAirAttack        = function(thisValue,players) { return function(id) { for(var i = 0; i < players.length;++i) { this.Flags.Combat.Remove(COMBAT_FLAGS.CAN_BE_AIR_BLOCKED); players[i].SetAllowAirBlock(id,thisValue.GetGame().GetCurrentFrame(),false); } } }
        var attack              = function(thisValue,players) { return function(hitDelayFactor, hitID, frame,points,flags,state,damage,moveOverrideFlags,frameEnergyToAdd,behaviorFlags,invokedAnimationName,hitSound,blockSound) { for(var i = 0; i < players.length;++i) { thisValue.GetPhysics().TryAttack(hitDelayFactor, hitID,frame,points,flags,state,this,players[i],damage,moveOverrideFlags,frameEnergyToAdd,behaviorFlags,invokedAnimationName,hitSound,blockSound); } } }
        var projectileAttack    = function(thisValue,players) { return function(frame,projectile) { for(var i = 0; i < players.length;++i) { thisValue.GetPhysics().TryProjectileAttack(frame,projectile,this,players[i]); } } }
        var changeHealth        = function(thisValue)         { return function(amount) { thisValue.ChangeHealth(this.team_,amount); } }
        var getHealth           = function(thisValue)         { return function() { return thisValue.GetHealth(this.team_); } }
        var changeEnergy        = function(thisValue)         { return function(amount) { thisValue.ChangeEnergy(this.team_,amount); } }
        var getEnergy           = function(thisValue)         { return function() { return thisValue.GetEnergy(this.team_); } }
        var incCombo            = function(thisValue,team)    { return function() { return team.IncCombo(); } }
        var incComboRefCount    = function(thisValue,team)    { return function() { return team.IncComboRefCount(); } }
        var decComboRefCount    = function(thisValue,team)    { return function() { return team.DecComboRefCount(); } }
        var getCurrentComboCount= function(thisValue,team)    { return function() { return team.GetCurrentCombo(); } }


        this.GetTeamA().SetPlayers(team1);
        this.GetTeamB().SetPlayers(team2);
        this.InitText();
        /*init team 1*/
        for(var i = 0; i < this.GetTeamA().GetPlayers().length; ++i)
        {
            this.GetTeamA().GetPlayer(i).id_ = "t1p" + i;
            this.GetTeamA().GetPlayer(i).SetIndex(i);
            this.GetTeamA().GetPlayer(i).moveStageXFn_ = moveStageX(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).fixXFn_ = fixX(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).moveXFn_ = moveX(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).moveYFn_ = moveY(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).moveOtherPlayersToBackFn_ = moveToBack(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).moveOtherPlayersToFrontFn_ = moveToFront(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).takeDamageFn_ = changeHealth(this);
            this.GetTeamA().GetPlayer(i).changeEnergyFn_ = changeEnergy(this);
            this.GetTeamA().GetPlayer(i).attackFn_ = attack(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).projectileAttackFn_ = projectileAttack(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).SetupInfo(1,"l");
            this.GetTeamA().GetPlayer(i).getHealthFn_ = getHealth(this);
            this.GetTeamA().GetPlayer(i).getEnergyFn_ = getEnergy(this);
            this.GetTeamA().GetPlayer(i).onStartAttackFn_ = startAttack(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).onEndAttackFn_ = endAttack(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).onStartAirAttackFn_ = startAirAttack(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).onEndAirAttackFn_ = endAirAttack(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).onProjectileMovedFn_ = projectileMoved(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).onProjectileGoneFn_ = projectileGone(this,this.GetTeamB().GetPlayers());
            this.GetTeamA().GetPlayer(i).onIncComboFn_ = incCombo(this,this.GetTeamA());
            this.GetTeamA().GetPlayer(i).onIncComboRefCountFn_ = incComboRefCount(this,this.GetTeamA());
            this.GetTeamA().GetPlayer(i).onDecComboRefCountFn_ = decComboRefCount(this,this.GetTeamA());
            this.GetTeamA().GetPlayer(i).getCurrentComboCountFn_ = getCurrentComboCount(this,this.GetTeamA());
            this.GetTeamA().GetPlayer(i).InitSprite();
            this.GetTeamA().GetPlayer(i).ChangeDirection(true);
        }
        if(!!this.GetTeamA().GetPlayer(0))
            this.GetTeamA().GetPlayer(0).SetX(STAGE.START_X);

        /*init team 2*/
        for(var i = 0; i < this.GetTeamB().GetPlayers().length; ++i)
        {
            this.GetTeamB().GetPlayer(i).id_ = "t2p" + i;
            this.GetTeamB().GetPlayer(i).SetIndex(i);
            this.GetTeamB().GetPlayer(i).moveStageXFn_ = moveStageX(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).fixXFn_ = fixX(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).moveXFn_ = moveX(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).moveYFn_ = moveY(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).moveOtherPlayersToBackFn_ = moveToBack(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).moveOtherPlayersToFrontFn_ = moveToFront(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).takeDamageFn_ = changeHealth(this);
            this.GetTeamB().GetPlayer(i).changeEnergyFn_ = changeEnergy(this);
            this.GetTeamB().GetPlayer(i).attackFn_ = attack(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).projectileAttackFn_ = projectileAttack(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).SetupInfo(2,"r");
            this.GetTeamB().GetPlayer(i).getHealthFn_ = getHealth(this);
            this.GetTeamB().GetPlayer(i).getEnergyFn_ = getEnergy(this);
            this.GetTeamB().GetPlayer(i).onStartAttackFn_ = startAttack(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).onEndAttackFn_ = endAttack(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).onStartAirAttackFn_ = startAirAttack(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).onEndAirAttackFn_ = endAirAttack(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).onProjectileMovedFn_ = projectileMoved(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).onProjectileGoneFn_ = projectileGone(this,this.GetTeamA().GetPlayers());
            this.GetTeamB().GetPlayer(i).onIncComboFn_ = incCombo(this,this.GetTeamB());
            this.GetTeamB().GetPlayer(i).onIncComboRefCountFn_ = incComboRefCount(this,this.GetTeamB());
            this.GetTeamB().GetPlayer(i).onDecComboRefCountFn_ = decComboRefCount(this,this.GetTeamB());
            this.GetTeamB().GetPlayer(i).getCurrentComboCountFn_ = getCurrentComboCount(this,this.GetTeamB());
            this.GetTeamB().GetPlayer(i).InitSprite();
        }
        if(!!this.GetTeamB().GetPlayer(0))
            this.GetTeamB().GetPlayer(0).SetX(STAGE.START_X);

        /*set the starting locations for each player*/
        for(var i = 1; i < this.GetTeamA().GetPlayers().length; ++i)
            this.GetTeamA().GetPlayer(i).SetX(STAGE.START_X + (STAGE.START_X_OFFSET * i));
        for(var i = 1; i < this.GetTeamB().GetPlayers().length; ++i)
            this.GetTeamB().GetPlayer(i).SetX(STAGE.START_X + (STAGE.START_X_OFFSET * i));

        this.GetStage().Init();
        this.GetTeamA().Init();
        this.GetTeamB().Init();

        if(!ignoreMusic)
            this.GetStage().PlayMusic();
    }