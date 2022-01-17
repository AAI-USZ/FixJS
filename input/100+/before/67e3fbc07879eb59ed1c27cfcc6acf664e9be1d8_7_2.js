function(hitDelayFactor,hitID,frame,points,flagsToSend,attackFlags,p1,p2,damage,moveOverrideFlags,energyToAdd,behaviorFlags,invokedAnimationName,hitSound,blockSound)
    {
        /*is p1 ejecting p2 from a grapple?*/
        if(!!(attackFlags & ATTACK_FLAGS.THROW_EJECT) && !p1.IsGrappling(p2.id_))
            return;
        /*is p2 being grappled by p1?*/
        if(p2.IsBeingGrappled() && !p1.IsGrappling(p2.id_))
            return;
        if(p2.Flags.Player.Has(PLAYER_FLAGS.IGNORE_ATTACKS))
            return;
        /*need to reform the "invulernable" flags - there are too many*/
        if(p2.Flags.Player.Has(PLAYER_FLAGS.SUPER_INVULNERABLE) && !(behaviorFlags & BEHAVIOR_FLAGS.THROW))
            return;
        /*frame can not hit more than once*/
        if(p2.lastHitFrame_[p1.id_] == p1.GetHitFrameID(hitID))
            return;
        /*if the attack is a throw, it can not grab more than one player*/
        if(p1.IsGrappling() && !p1.IsGrappling(p2.id_))
            return;
        if(p2.IsGrappling())
            return;
        if(p2.IsAirborne() && !!(attackFlags & ATTACK_FLAGS.CAN_AIR_JUGGLE))
        {
            //return;
        }
        else if(p2.Flags.Player.Has(PLAYER_FLAGS.INVULNERABLE))
            return;
        var isGrapple = !!(behaviorFlags & BEHAVIOR_FLAGS.THROW);
        var p1Left = p1.GetLeftX(true);
        var p1Right = p1.GetRightX(true);
        var p1Top = p1.GetBoxTop();
        var p1Bottom = p1.GetBoxBottom();

        var p2Left = p2.GetLeftX(true);
        var p2Right = p2.GetRightX(true);
        var p2Top = p2.GetOffsetBoxTop();
        var p2Bottom = p2.GetOffsetBoxBottom();

        var fx = 1;
        var fy = 1;

        if(p1.direction_ < 0)
        {
            for(var i = 0; i < points.length; ++i)
            {
                fx = points[i].Fx || fx;
                fy = points[i].Fy || fy;

                var x = p1Left + points[i].x;
                var y = p1Bottom + points[i].y;
                if(((points[i].x == -1) && !!p2.IsBeingGrappled()) || (x >= p2Left && x < p2Right && y >= p2Bottom && y < p2Top))
                {
                    p1.SetGiveHit(attackFlags,hitDelayFactor,energyToAdd,behaviorFlags,p2);
                    p2.SetRegisteredHit(attackFlags,points[i].state,flagsToSend,frame,damage,energyToAdd,isGrapple,false,STAGE.MAX_STAGEX - x,y,p1.direction_,p1.id_,p1.GetHitFrameID(hitID),moveOverrideFlags,p1,fx, fy, behaviorFlags,invokedAnimationName,hitSound,blockSound);
                    break;
                }
            }
        }
        else
        {
            for(var i = 0; i < points.length; ++i)
            {
                fx = points[i].Fx || fx;
                fy = points[i].Fy || fy;

                var x = p1Right - points[i].x;
                var y = p1Bottom + points[i].y;
                if(((points[i].x == -1) && !!p2.IsBeingGrappled()) || ((x <= p2Right && x > p2Left && y >= p2Bottom && y < p2Top)))
                {
                    p1.SetGiveHit(attackFlags,hitDelayFactor,energyToAdd, behaviorFlags,p2);
                    p2.SetRegisteredHit(attackFlags,points[i].state,flagsToSend,frame,damage,energyToAdd,isGrapple,false,x,y,p1.direction_,p1.id_,p1.GetHitFrameID(hitID),moveOverrideFlags,p1,fx, fy, behaviorFlags,invokedAnimationName,hitSound,blockSound);
                    break;
                }
            }
        }
    }