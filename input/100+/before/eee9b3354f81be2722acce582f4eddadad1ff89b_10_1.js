function(frame)
    {
        player_.ClearInput();
        if((frame % 20) == 0)
            player.TargetLastAttacker();

        if(player_.flags_.Pose.Has(POSE_FLAGS.ALLOW_BLOCK))
        {
            if(!DoUppercut_())
            {
                player_.SendInput(blockInput_);
            }
        }
        else
        {
            /*are all players on the other team on the ground?*/
            if(IsOtherTeamOnGround_())
            {
                ThrowFireball_();
            }
            else
            {
                if(!DoUppercut_())
                {
                    ThrowFireball_();
                }
            }
        }
    }