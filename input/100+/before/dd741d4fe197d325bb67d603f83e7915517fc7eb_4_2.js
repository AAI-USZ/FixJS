function(frame,projectile,p1,p2)
    {
        if(p2.IsGrappling())
            return;
        if(p2.flags_.Player.Has(PLAYER_FLAGS.IGNORE_ATTACKS))
            return;
        if(p2.flags_.Player.Has(PLAYER_FLAGS.SUPER_INVULNERABLE))
            return;
        //if(p2.flags_.Player.Has(PLAYER_FLAGS.DEAD))
        //    return;
        if(p2.flags_.Player.Has(PLAYER_FLAGS.IGNORE_PROJECTILES))
            return;
        if(p2.IsAirborne() && !!projectile && !!(projectile.flagsToSend_ & ATTACK_FLAGS.SUPER) && !!projectile.canJuggle_)
        {
            /*allows super fireballs to hit multiple times in the air*/
        }

        else if(p2.flags_.Player.Has(PLAYER_FLAGS.INVULNERABLE) || !projectile)
            return;
        if(!projectile.CanHit(frame))
            return;
        var p2Left = p2.GetLeftX(true);
        var p2Right = p2.GetRightX(true);
        var p2Top = p2.GetOffsetBoxTop();
        var p2Bottom = p2.GetOffsetBoxBottom();

        var y0 = projectile.GetTop();
        var y1 = projectile.GetBottom();
        var x0 = 0;
        var x1 = 0;

        if(projectile.direction_ < 0)
        {
            x0 = projectile.GetBackX();
            x1 = projectile.GetFrontX();
            if(((x0 >= p2Left && x0 < p2Right) || (x1 >= p2Left && x1 < p2Right)) && ((y0 >= p2Bottom && y0 < p2Top) || (y1 >= p2Bottom && y1 < p2Top)))
            {
                /*Calculate a general hit poisition.
                Since this function use left zeroed only values, we must convert, so that the right can be zeroed as well*/
                var hitX = ((x1 - x0) / 2) + x0;
                if(p2.direction_ > 0)
                    hitX = STAGE.MAX_STAGEX - hitX;
                var hitY = ((y1 - y0) / 2) + y0;
                if(p2.SetRegisteredHit(projectile.attackState_,projectile.hitState_,projectile.flagsToSend_,frame,projectile.baseDamage_,projectile.energyToAdd_,true,hitX,hitY,projectile.direction_,p1.id_,null,null,null,projectile.fx_,projectile.fy_,0,0,projectile.hitSound_,projectile.blockSound_))
                {
                    p1.ChangeEnergy(projectile.energyToAdd_);
                    projectile.HitPlayer(frame);
                }
            }
            else
            {
                /*test against the other player's projectiles*/
                for(var i = 0; i < p2.projectiles_.length; ++i)
                    this.TryProjectileHitProjectile(frame,x0,x1,y0,y1,projectile,p2.projectiles_[i]);
            }
        }
        else
        {
            x0 = projectile.GetBackX();
            x1 = projectile.GetFrontX();
            if(((x1 >= p2Left && x1 < p2Right) || (x0 >= p2Left && x0 < p2Right)) && ((y0 >= p2Bottom && y0 < p2Top) || (y1 >= p2Bottom && y1 < p2Top)))
            {
                /*Calculate a general hit poisition.*/
                var hitX = ((x1 - x0) / 2) + x0;
                var hitY = ((y1 - y0) / 2) + y0;
                if(p2.SetRegisteredHit(projectile.attackState_,projectile.hitState_,projectile.flagsToSend_,frame,projectile.baseDamage_,projectile.energyToAdd_,true,hitX,hitY,projectile.direction_,p1.id_,null,null,null,projectile.fx_,projectile.fy_,0,0,projectile.hitSound_,projectile.blockSound_))
                {
                    p1.ChangeEnergy(projectile.energyToAdd_);
                    projectile.HitPlayer(frame);
                }
            }
            else
            {
                /*test against the other player's projectiles*/
                for(var i = 0; i < p2.projectiles_.length; ++i)
                    this.TryProjectileHitProjectile(frame,x0,x1,y0,y1,projectile,p2.projectiles_[i]);
            }
        }

    }