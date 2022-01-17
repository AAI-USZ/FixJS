function(player,team)
    {
        var moveStageX          = function(thisValue,otherTeam) { return function(amount,dontOverrideSign) { for(var i = 0; i < otherTeam.GetPlayers().length;++i) {amount = thisValue.GetStage().ScrollX(amount,this,otherTeam.GetPlayers()[i],thisValue,dontOverrideSign);}; return amount; } };
        var fixX                = function(thisValue,otherTeam) { return function(amount) {thisValue.GetPhysics().FixX(amount,this,false,true);  return 0; } };
        var moveX               = function(thisValue,otherTeam) { return function(amount) {amount = thisValue.GetStage().ScrollX(amount,this,null,thisValue); thisValue.GetPhysics().MoveX(amount,this,false,true); return 0; } };
        var moveY               = function(thisValue,otherTeam) { return function(amount) {amount = thisValue.GetPhysics().MoveY(amount,this); return 0; } };
        var moveToBack          = function(thisValue,otherTeam) { return function() { for(var i = 0; i < otherTeam.GetPlayers().length;++i) {otherTeam.GetPlayers()[i].MoveToBack(true);} } }
        var moveToFront         = function(thisValue,otherTeam) { return function() { for(var i = 0; i < otherTeam.GetPlayers().length;++i) {otherTeam.GetPlayers()[i].MoveToFront(true);} } }
        var projectileMoved     = function(thisValue,otherTeam) { return function(id,x,y) { for(var i = 0; i < otherTeam.GetPlayers().length;++i) { otherTeam.GetPlayers()[i].SetAllowBlockFromProjectile(thisValue.GetGame().GetCurrentFrame(),true,id,x,y); } } }
        var projectileGone      = function(thisValue,otherTeam) { return function(id)     { for(var i = 0; i < otherTeam.GetPlayers().length;++i) { otherTeam.GetPlayers()[i].SetAllowBlockFromProjectile(thisValue.GetGame().GetCurrentFrame(),false,id); } } }
        var startAttack         = function(thisValue,otherTeam) { return function(id) { for(var i = 0; i < otherTeam.GetPlayers().length;++i) { otherTeam.GetPlayers()[i].SetAllowBlock(id,thisValue.GetGame().GetCurrentFrame(),true,this.GetMidX(),this.GetMidY()); } } }
        var endAttack           = function(thisValue,otherTeam) { return function(id) { for(var i = 0; i < otherTeam.GetPlayers().length;++i) { this.Flags.Combat.Remove(COMBAT_FLAGS.CAN_BE_BLOCKED); otherTeam.GetPlayers()[i].SetAllowBlock(id,thisValue.GetGame().GetCurrentFrame(),false); } } }
        var startAirAttack      = function(thisValue,otherTeam) { return function(id) { for(var i = 0; i < otherTeam.GetPlayers().length;++i) { otherTeam.GetPlayers()[i].SetAllowAirBlock(id,thisValue.GetGame().GetCurrentFrame(),true,this.GetMidX(),this.GetMidY()); } } }
        var endAirAttack        = function(thisValue,otherTeam) { return function(id) { for(var i = 0; i < otherTeam.GetPlayers().length;++i) { this.Flags.Combat.Remove(COMBAT_FLAGS.CAN_BE_AIR_BLOCKED); otherTeam.GetPlayers()[i].SetAllowAirBlock(id,thisValue.GetGame().GetCurrentFrame(),false); } } }
        var attack              = function(thisValue,otherTeam) { return function(hitDelayFactor, hitID, frame,points,flags,state,damage,moveOverrideFlags,frameEnergyToAdd,behaviorFlags,invokedAnimationName,hitSound,blockSound) { for(var i = 0; i < otherTeam.GetPlayers().length;++i) { thisValue.GetPhysics().TryAttack(hitDelayFactor, hitID,frame,points,flags,state,this,otherTeam.GetPlayers()[i],damage,moveOverrideFlags,frameEnergyToAdd,behaviorFlags,invokedAnimationName,hitSound,blockSound); } } }
        var projectileAttack    = function(thisValue,otherTeam) { return function(frame,projectile) { for(var i = 0; i < otherTeam.GetPlayers().length;++i) { thisValue.GetPhysics().TryProjectileAttack(frame,projectile,this,otherTeam.GetPlayers()[i]); } } }
        var changeHealth        = function(thisValue)         { return function(amount) { thisValue.ChangeHealth(this.team_,amount); } }
        var getHealth           = function(thisValue)         { return function() { return thisValue.GetHealth(this.team_); } }
        var changeEnergy        = function(thisValue)         { return function(amount) { thisValue.ChangeEnergy(this.team_,amount); } }
        var getEnergy           = function(thisValue)         { return function() { return thisValue.GetEnergy(this.team_); } }
        var incCombo            = function(thisValue,team)    { return function() { return team.IncCombo(); } }
        var incComboRefCount    = function(thisValue,team)    { return function() { return team.IncComboRefCount(); } }
        var decComboRefCount    = function(thisValue,team)    { return function() { return team.DecComboRefCount(); } }
        var getCurrentComboCount= function(thisValue,team)    { return function() { return team.GetCurrentCombo(); } }

        var otherTeam = null;
        var myTeam = null;
        var dir = "";

        switch(team)
        {
            case 1: {dir = "l"; myTeam = this.TeamA; otherTeam = this.TeamB; break;}
            case 2: {dir = "r"; myTeam = this.TeamB; otherTeam = this.TeamA; break;}
        }

        var index = Match.prototype.PlayerIndex++;

        player.id_ = "t" + team + "p" + index;
        player.moveStageXFn_ = moveStageX(this,otherTeam);
        player.fixXFn_ = fixX(this,otherTeam);
        player.moveXFn_ = moveX(this,otherTeam);
        player.moveYFn_ = moveY(this,otherTeam);
        player.moveOtherPlayersToBackFn_ = moveToBack(this,otherTeam);
        player.moveOtherPlayersToFrontFn_ = moveToFront(this,otherTeam);
        player.takeDamageFn_ = changeHealth(this);
        player.changeEnergyFn_ = changeEnergy(this);
        player.attackFn_ = attack(this,otherTeam);
        player.projectileAttackFn_ = projectileAttack(this,otherTeam);
        player.SetupInfo(team,dir);
        player.getHealthFn_ = getHealth(this);
        player.getEnergyFn_ = getEnergy(this);
        player.onStartAttackFn_ = startAttack(this,otherTeam);
        player.onEndAttackFn_ = endAttack(this,otherTeam);
        player.onStartAirAttackFn_ = startAirAttack(this,otherTeam);
        player.onEndAirAttackFn_ = endAirAttack(this,otherTeam);
        player.onProjectileMovedFn_ = projectileMoved(this,otherTeam);
        player.onProjectileGoneFn_ = projectileGone(this,otherTeam);
        player.onIncComboFn_ = incCombo(this,myTeam);
        player.onIncComboRefCountFn_ = incComboRefCount(this,myTeam);
        player.onDecComboRefCountFn_ = decComboRefCount(this,myTeam);
        player.getCurrentComboCountFn_ = getCurrentComboCount(this,myTeam);
        player.InitSprite();
        if(team == 1)
            player.ChangeDirection(true);

    }