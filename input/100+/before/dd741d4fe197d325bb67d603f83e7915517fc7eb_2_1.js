function(frame)
{
    for(var i in this.Actions)
    {
        var item = this.Actions[i];
        if(!!item && !!item.ActionFrame && (item.ActionFrame == frame))
        {
            var canP1Hit = !!item[0] && this.Test(item[0].Key,0);
            var canP2Hit = !!item[1] && this.Test(item[1].Key,1);

            var canP1HitBeOverriden = !!item[0] && this.CanOverride(item[0].Key,0);
            var canP2HitBeOverriden = !!item[1] && this.CanOverride(item[1].Key,1);

            if(canP1HitBeOverriden && canP2HitBeOverriden)
            {
                canP1Hit = true;
                canP2Hit = true;
            }
            else
            {
                if(canP1HitBeOverriden) canP1Hit = false;
                if(canP2HitBeOverriden) canP2Hit = false;
            }

            /*if both hits can hit, or if nobody can hit, then allow double hit*/
            var canDoubleHit =     ((canP1Hit && !canP1HitBeOverriden) && (canP2Hit && !canP2HitBeOverriden))
                                || ((canP1Hit && canP1HitBeOverriden) && (canP2Hit && canP2HitBeOverriden))
                                || ((!canP1Hit && !canP1HitBeOverriden) && (!canP2Hit && !canP2HitBeOverriden))
                                || ((!canP1Hit && canP1HitBeOverriden) && (!canP2Hit && canP2HitBeOverriden));

            /*if nobody can hit, then allow the move executed last to register the hit*/
            if((!canDoubleHit) && (!canP1Hit && !canP2Hit) && !canP1HitBeOverriden)
            {
                if(!!item[0] && !item[1])
                {
                    if(item[0].Player.currentAnimation_.StartFrame < item[0].OtherPlayer.currentAnimation_.StartFrame)
                    {
                        canP1Hit = true;
                        canP2Hit = false;
                        canDoubleHit = false;
                    }
                }
            }

            if(!!item[0] && (canP1Hit || canDoubleHit))
            {
                /*player 1 registers action*/
                item[0].Player.RegisterHit(frame);
            }
            if(!!item[1] && (canP2Hit || canDoubleHit))
            {
                /*player 2 registers action*/
                item[1].Player.RegisterHit(frame);
            }
            /*clear the action*/
            this.Actions[i] = null;
            delete this.Actions[i];
        }
    }
}