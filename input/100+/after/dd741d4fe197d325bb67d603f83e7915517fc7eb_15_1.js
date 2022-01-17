function(frame)
    {
        
        if(inputToSend_.length == 0)
        {
            player_.ClearInput();
            if((frame % 20) == 0)
                player.TargetLastAttacker(frame);

            if(player_.flags_.Pose.Has(POSE_FLAGS.ALLOW_BLOCK))
            {
                if(!DoUppercut_(frame))
                {
                    SendInput_(frame,blockInput_);
                }
            }
            else
            {
                /*are all players on the other team on the ground?*/
                if(IsOtherTeamOnGround_(frame))
                {
                    ThrowFireball_(frame);
                }
                else
                {
                    if(!DoUppercut_(frame))
                    {
                        ThrowFireball_(frame);
                    }
                }
            }
        }

        var i = 0;
        while(i < inputToSend_.length)
        {
            if(inputToSend_[i].Frame == frame)
            {
                player_.SendInput(inputToSend_[i].Input);
                inputToSend_.splice(i,1);
            }
            else
            {
                ++i;
            }
        }
    }