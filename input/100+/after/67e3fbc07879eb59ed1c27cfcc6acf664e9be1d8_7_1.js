function(rect,who,type)
    {
        var team = who.team_;
        var temp = [];
        var retVal = [];
        var match = GetMatch_();
        var PADDING = 1;
        var players = (team == CONSTANTS.TEAM1) ? match.TeamB.GetPlayers() : match.TeamA.GetPlayers();
        var distance = 0;
        var otherRect = {};
        var hasP1RightIntersection = false;
        var hasP1ExistsingRightIntersection = false;
        var hasP1LeftIntersection = false;
        var hasP1ExistsingLeftIntersection = false;
        var hasP1TopIntersetion = false;
        var hasP1BottomIntersection = false;
        var hasP2RightIntersection = false;
        var hasP2LeftIntersection = false;
        var hasP2TopIntersetion = false;
        var hasP2BottomIntersection = false;


        for(var i = 0, length = players.length; i < length; ++i)
        {
            if((who.Flags.Player.Has(PLAYER_FLAGS.IGNORE_COLLISIONS) || players[i].Flags.Player.Has(PLAYER_FLAGS.IGNORE_COLLISIONS)) || (who.ignoreCollisionsWith_ == players[i].id_) || (players[i].ignoreCollisionsWith_ == who.id_))
                continue;

            distance = 0;
            otherRect = players[i].GetRect();

            hasP1RightIntersection = (rect.Right >= otherRect.Left && rect.Right <= otherRect.Right);
            hasP1ExistsingRightIntersection = !!rect.OldRight && (rect.OldRight >= otherRect.Left && rect.OldRight <= otherRect.Right);
            hasP1LeftIntersection = (rect.Left >= otherRect.Left && rect.Left <= otherRect.Right);
            hasP1ExistsingLeftIntersection = !!rect.OldLeft && (rect.OldLeft >= otherRect.Left && rect.OldLeft <= otherRect.Right);
            hasP1TopIntersection = (rect.Top >= otherRect.Bottom && rect.Top <= otherRect.Top);
            hasP1BottomIntersection = (rect.Bottom >= otherRect.Bottom && rect.Bottom <= otherRect.Top);

            hasP2RightIntersection = (otherRect.Right >= rect.Left && otherRect.Right <= rect.Right);
            hasP2LeftIntersection = (otherRect.Left >= rect.Left && otherRect.Left <= rect.Right);
            hasP2TopIntersection = (otherRect.Top >= rect.Bottom && otherRect.Top <= rect.Top);
            hasP2BottomIntersection = (otherRect.Bottom >= rect.Bottom && otherRect.Bottom <= rect.Top);

            switch(type)
            {
                case CONSTANTS.RIGHT: /*moving right*/
                {
                    if(hasP1RightIntersection && hasP1BottomIntersection) distance = rect.Right - otherRect.Left;
                    else if(hasP1ExistsingRightIntersection && hasP1BottomIntersection) distance = -(rect.OldRight - otherRect.Left);
                    break;
                }
                case CONSTANTS.LEFT: /*moving left*/
                {
                    if(hasP1LeftIntersection && hasP1BottomIntersection) distance = rect.Left - otherRect.Right;
                    else if(hasP1ExistsingLeftIntersection && hasP1BottomIntersection) distance = -(rect.OldLeft - otherRect.Right);
                    break;
                }
                case CONSTANTS.LEFT_AND_CHECK_RIGHT: /*moving left, but checks for right side collision as well*/
                {
                    if((hasP1LeftIntersection || hasP1RightIntersection) && hasP1BottomIntersection) distance = rect.Left - otherRect.Right;
                    break;
                }
                case CONSTANTS.RIGHT_AND_CHECK_LEFT: /*moving right, but checks for left side collision as well*/
                {
                    if((hasP1LeftIntersection || hasP1RightIntersection) && hasP1BottomIntersection) distance = rect.Right - otherRect.Left;
                    break;
                }
                case CONSTANTS.UP: /*moving up*/
                {
                    if((hasP1TopIntersection || hasP2TopIntersection) && (hasP1RightIntersection || hasP2RightIntersection)) distance = rect.Top - otherRect.Bottom;
                    break;
                }
                case CONSTANTS.DOWN: /*moving down*/
                {
                    if((hasP1BottomIntersection || hasP2BottomIntersection) && (hasP1RightIntersection || hasP2RightIntersection)) distance = rect.Bottom - otherRect.Top;
                    break;
                }
            };

            if(!!distance) temp[temp.length] = {Distance:Math.abs(distance), Player:players[i]};
        }


        /*arrange the list of items from closest to farthest*/
        var indices = [];
        var maxDist = -1;
        var index = -1;
        while(temp.length > 0)
        {
            maxDist = -1;
            index = -1;
            for(var i = 0, length = temp.length; i < length; ++i)
            {
                if(temp[i].Distance > maxDist)
                {
                    index = i;
                    maxDist = temp[i].Distance;
                }
            }
            if(index > -1)
                retVal[retVal.length] = temp.splice(index,1)[0].Player;
        }

        return retVal;
    }