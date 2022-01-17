function(amount,p1,p2,match,dontOverrideSign)
{

    /*p1 must be the leftmost or right most player*/
    var retVal = amount;

    if(this.GetPhysics().IsLeftMostPlayer(p1.id_))
    {
        p2 = this.GetPhysics().GetRightMostPlayer();
    }
    else if(this.GetPhysics().IsRightMostPlayer(p1.id_))
    {
        p2 = this.GetPhysics().GetLeftMostPlayer();
    }
    else
        return retVal * 2;

    var direction = 1;
    /*decouple the direction of the amount from the players direction since we are using absolute positions in this function*/
    if(!dontOverrideSign)
    {
        if(p1.direction_ > 0)
        {
            if(amount > 0) {direction = -1;amount = -Math.abs(amount);} else {direction = 1;amount = Math.abs(amount);}
        } 
        else
        {
            if(amount > 0) {direction = 1;amount = Math.abs(amount);} else {direction = -1; amount = -Math.abs(amount);}
        }
    }

    if(!p2)
    {
        this._MoveX(-amount,true);
        return retVal;
    }

    /*physics with stage*/
    var p1x0 = p1.GetX();
    var p1x1 = p1x0 + retVal;
    var p2x0 = p2.GetX();


    var p1LeftX = p1.GetLeftX();
    var p1RightX = p1.GetRightX();
    var p1NewLeftX = p1LeftX + amount;
    var p1NewRightX = p1RightX + amount;
    var p1MidX = p1LeftX + (p1RightX - p1LeftX)/2;
    var p1NewMidX = p1MidX + amount;

    var p2LeftX = p2.GetLeftX();
    var p2RightX = p2.GetRightX();
    var p2NewLeftX = p2LeftX + amount;
    var p2NewRightX = p2RightX + amount;
    var p2MidX = p2LeftX + (p2RightX - p2LeftX)/2;
    var p2NewMidX = p2MidX + amount;


    var fn = function(p2NewX, canCheck, isMovingBackwards, canIncreaseDeltaX)
    {
        var tmp = amount;
        var diffX = p2x0 - p1x1
        
        if(p1x1 < (p2x0 - tmp) && canCheck)
        {
            if(!!isMovingBackwards)
            {
                tmp = Math.min(diffX,amount * 2);
            }
        }

        if(!!canIncreaseDeltaX)
            tmp *= 4;

        this._MoveX(-tmp,false,p2NewX);
        return retVal;
    }

    var isP1InLeftThreshold = p1NewMidX >= CONSTANTS.MOVEMENT_THRESHOLD_LEFT;
    var isP2InLeftThreshold = p2NewMidX >= CONSTANTS.MOVEMENT_THRESHOLD_LEFT;
    var isP1InRightThreshold = p1NewMidX <= CONSTANTS.MOVEMENT_THRESHOLD_RIGHT;
    var isP2InRightThreshold = p2NewMidX <= CONSTANTS.MOVEMENT_THRESHOLD_RIGHT;
    var areBothPlayersInRightThreshold = isP1InRightThreshold && isP2InRightThreshold;
    var areBothPlayersInLeftThreshold = isP1InLeftThreshold && isP2InLeftThreshold;

    var isP1InThreshold = p1NewMidX >= CONSTANTS.MOVEMENT_THRESHOLD_LEFT && p1NewMidX <= CONSTANTS.MOVEMENT_THRESHOLD_RIGHT;
    var isP2InThreshold = p2NewMidX >= CONSTANTS.MOVEMENT_THRESHOLD_LEFT && p2NewMidX <= CONSTANTS.MOVEMENT_THRESHOLD_RIGHT;
    var areBothPlayersInThreshold = isP1InThreshold && isP2InThreshold;
    var isStageLeftCornered = this.x_ >= STAGE.MAX_STAGEX;
    var isStageRightCornered = this.x_ <= STAGE.MIN_STAGEX;
    var isStageCornered = isStageLeftCornered || isStageRightCornered;

    var isLeftPlayer = p1LeftX < p2LeftX;
    var leftCornerGap = isLeftPlayer ? p1LeftX : p2LeftX;
    var rightCornerGap = !isLeftPlayer ? STAGE.MAX_STAGEX - p1RightX : STAGE.MAX_STAGEX - p2RightX;
    var p2NewX = p2.GetX() + (p2.direction_) * amount;

    var hasLargerLeftGap = leftCornerGap > rightCornerGap;
    var hasLargerRightGap = !hasLargerLeftGap;
    var isP1InAnyThreshold = isP1InThreshold ||  (isStageLeftCornered && isP1InLeftThreshold) || (isStageRightCornered && isP1InRightThreshold);
    var isMovingBackwards = !((p1.direction_ == -1 && amount > 0) || (p1.direction_ == 1 && amount < 0));
    var canIncreaseDeltaX = p1.JumpedOverAPlayer() && this.GetPhysics().IsWithinDistanceX(p1,p2,CONSTANTS.SO_CLOSE);
    /*if both players are in the threshold, then the stage should not move*/
    if(areBothPlayersInThreshold)
    {
        //retVal *= 2;
    }
    /*if the stage is NOT cornered, and one of the players is outside of the threshold, then the stage can move*/
    else if(!isStageCornered && !areBothPlayersInThreshold)
    {
        retVal = fn.call(this,p2NewX,!isP1InAnyThreshold,isMovingBackwards,canIncreaseDeltaX);
    }
    /*if the stage is left cornered, and the cornered player has moved far enough, and one of the players is beyond one of the right threshold, then the stage can move*/
    else if (isStageLeftCornered && hasLargerLeftGap && !areBothPlayersInRightThreshold)
    {
        retVal = fn.call(this,p2NewX,!isP1InAnyThreshold,isMovingBackwards,canIncreaseDeltaX);
    }
    /*if the stage is right cornered, and the cornered player has moved far enough, and one of the players is beyond one of the left threshold, then the stage can move*/
    else if (isStageRightCornered && hasLargerRightGap && !areBothPlayersInLeftThreshold)
    {
        retVal = fn.call(this,p2NewX,!isP1InAnyThreshold,isMovingBackwards,canIncreaseDeltaX);
    }


    return retVal * 2;
}