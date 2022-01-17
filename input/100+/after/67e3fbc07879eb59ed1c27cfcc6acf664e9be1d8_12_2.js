function(player)
{
    var folder = "images/misc/" + player.folder_;

    var speed = 13;
    for(var x = 0; x < 3; ++x)
    {
        var projectile = player.AddProjectile("super projectile",160,140,speed);
        projectile.hitSound_ = HITSOUND.HP;

        projectile.canJuggle_ = true;
        projectile.maxHits_ = x + 3;
        projectile.hitStopFrameCount_ = 5;
        projectile.attackState_ = ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE_HARD;
        projectile.hitState_ = HIT_FLAGS.NEAR;
        projectile.flagsToSend_ = ATTACK_FLAGS.HARD;
        projectile.EnergyToAdd = (10);
        if(x == 0)
            projectile.flagsToSend_ |= ATTACK_FLAGS.SUPER|ATTACK_FLAGS.PROJECTILE;
        else if(x == 1)
            projectile.flagsToSend_ |= ATTACK_FLAGS.SUPER|ATTACK_FLAGS.PROJECTILE;
        else if(x == 2)
            projectile.flagsToSend_ |= ATTACK_FLAGS.SUPER|ATTACK_FLAGS.PROJECTILE;

        projectile.baseDamage_ = 25;

        /*this formula is applied each frame to compute the X coordinate of the projectile*/
        projectile.animation_.VxFn = (function(args) { return function(xSpeed,t) { return xSpeed; } });
        /*this formula is applied each frame to compute the Y coordinate of the projectile*/
        projectile.animation_.VyFn = (function(args) { return function(ySpeed,t) { return ySpeed; } });

        var fOffset = -70;
        var f1 = fOffset + 70;
        var f2 = fOffset + 46;
        var f3 = fOffset + 76;
        var f4 = fOffset + 40;
        var f5 = fOffset + 96;
        var f6 = fOffset + 0;
        var f7 = fOffset + 78;
        var f8 = fOffset + 36;

        projectile.animation_.AddFrame(player,"",folder + "/x-fb-projectiles-super-1.png",1,0,0,f1);
        projectile.animation_.AddFrame(player,"",folder + "/x-fb-projectiles-super-2.png",2,0,0,f2);
        projectile.animation_.AddFrame(player,"",folder + "/x-fb-projectiles-super-3.png",1,0,0,f3);
        projectile.animation_.AddFrame(player,"",folder + "/x-fb-projectiles-super-4.png",2,0,0,f4);
        projectile.animation_.AddFrame(player,"",folder + "/x-fb-projectiles-super-5.png",1,0,0,f5);
        projectile.animation_.AddFrame(player,"",folder + "/x-fb-projectiles-super-6.png",2,0,0,f6);
        projectile.animation_.AddFrame(player,"",folder + "/x-fb-projectiles-super-7.png",1,0,0,f7);
        projectile.animation_.AddFrame(player,"",folder + "/x-fb-projectiles-super-8.png",2,0,0,f8);

        projectile.disintegrationAnimation_.AddFrame(player,"",folder + "/x-fb-projectile-hit-0.png",3,0,0,0,0);
        projectile.disintegrationAnimation_.AddFrame(player,"",folder + "/x-fb-projectile-hit-1.png",3,0,0,0,0);
        projectile.disintegrationAnimation_.AddFrame(player,"",folder + "/x-fb-projectile-hit-2.png",3,0,0,0,0);
        projectile.disintegrationAnimation_.AddFrame(player,"",folder + "/x-fb-projectile-hit-3.png",3,0,0,0,0);
        projectile.disintegrationAnimation_.AddFrame(player,"",folder + "/x-fb-projectile-hit-4.png",3,0,0,0,0);
        projectile.disintegrationAnimation_.AddFrame(player,"",folder + "/x-fb-projectile-hit-5.png",3,0,0,0,0);

        
        var button = BUTTONS.LIGHT_PUNCH;
        if(x == 1) {button = BUTTONS.MEDIUM_PUNCH;}
        else if(x == 2) {button = BUTTONS.HARD_PUNCH;}

        var s_fireball = player.AddAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"super fireball p" + (x+1),50,[BUTTONS.CROUCH, BUTTONS.CROUCH|BUTTONS.FORWARD, BUTTONS.FORWARD,0,BUTTONS.CROUCH, BUTTONS.CROUCH|BUTTONS.FORWARD, BUTTONS.FORWARD, BUTTONS.FORWARD|button],CONSTANTS.MAX_PRIORITY,false);
        s_fireball.IsSuperMove = true;
        s_fireball.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE,OVERRIDE_FLAGS.NONE);


        s_fireball.energyToSubtract_ = CONSTANTS.ONE_LEVEL * (x + 1);
        s_fireball.EnergyToAdd = (5);
        s_fireball.Flags = ({Combat:COMBAT_FLAGS.PROJECTILE_ACTIVE});
        s_fireball.AddFrameWithSound(player,1,"audio/ryu/sinku.zzz","",folder + "/x-fb-0.png",1,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,25,0,0,0,null,0,0,0,-CONSTANTS.ONE_LEVEL*(x+1));
        s_fireball.AddFrame(player,"",folder + "/x-fb-1.png",36,MISC_FLAGS.NONE);
        s_fireball.AddFrame(player,"",folder + "/x-fb-2.png",1,MISC_FLAGS.NONE,{Combat:COMBAT_FLAGS.SUPER_MOVE_PAUSE});
        s_fireball.AddFrameWithSound(player,1,"audio/ryu/haduken.zzz","",folder + "/x-fb-3.png",1,{Combat:COMBAT_FLAGS.SPAWN_PROJECTILE|COMBAT_FLAGS.PROJECTILE_ACTIVE},0,0,0,0,0,player.projectiles_.length-1);
        s_fireball.AddFrameWithSound(player,1,"audio/misc/super-projectile-0.zzz","",folder + "/x-fb-3.png",31);
        s_fireball.AddFrame(player,"",folder + "/x-k1-4.png",6);

        /*add an animation for the fireball charge up*/
        var fb_residue = CreateBasicAnimation("fireball charge",[],false,0,folder + "/misc-sprites.png");
        fb_residue.AddEmptyFrame(player,1);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-0.png",3,0,142);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-1.png",1,-42,98);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-0.png",2,0,142);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-1.png",1,-42,98);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-0.png",1,0,142);

        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",2,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-1.png",2,-42,98);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-1.png",2,-42,98);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-1.png",2,-42,98);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",2,-49,103);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);

        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-4.png",1,24,86);

        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-5.png",4,122,83);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-6.png",5,141,86);
        fb_residue.AddFrame(player,folder + "/x-super-fireball-spark-7.png",4,141,86);

        s_fireball.AddAnimation(fb_residue);

        /*add the trail for the super move*/
        
        var trail = CreateAnimationTrail([]);
        for(var trailIndex = 1; trailIndex < 3; ++trailIndex)
        {
            /*trail*/
            var s_fireball_trail = CreateGenericAnimation("super fireball trail");
            s_fireball_trail.AddTrailFrame(player,folder + "/x-fb-0-shadow-" + trailIndex + ".png",4);
            s_fireball_trail.AddTrailFrame(player,folder + "/x-fb-1-shadow-" + trailIndex + ".png",36);
            s_fireball_trail.AddTrailFrame(player,folder + "/x-fb-2-shadow-" + trailIndex + ".png",4);
            s_fireball_trail.AddTrailFrame(player,folder + "/x-fb-3-shadow-" + trailIndex + ".png",1);
            s_fireball_trail.AddTrailFrame(player,folder + "/x-fb-3-shadow-" + trailIndex + ".png",CONSTANTS.FRAME_MAX);

            trail.Add(s_fireball_trail,player.element_,player.folder_);
        }
        
        s_fireball.Trail = trail;

    }

}