function(key,index)
{
    var first = index == 0 ? this.Actions[key][0] : this.Actions[key][1];
    var second = index == 0 ? this.Actions[key][1] : this.Actions[key][0];

    var retVal  = false;
    if(!!first.OtherPlayer && !!first.Player.currentAnimation_.Animation)
    {
        var a = first.Player.currentAnimation_.Animation.moveOverrideFlags_.HasOverrideFlag(OVERRIDE_FLAGS.ALL)
        var b = first.OtherPlayer.currentAnimation_.Animation.moveOverrideFlags_.HasAllowOverrideFlag(OVERRIDE_FLAGS.ALL)
        var c = first.Player.currentAnimation_.Animation.moveOverrideFlags_.HasOverrideFlag(first.OtherPlayer.currentAnimation_.Animation.moveOverrideFlags_.AllowOverrideFlags);
        var d = first.IsProjectile;
        var e = !!second && second.IsGrapple;
        var f = first.IsGrapple;
        var ignore = first.Player.flags_.Player.Has(PLAYER_FLAGS.IGNORE_MOVE_OVERRIDE);

        retVal = !!ignore && (a || b || (c && first.Player.isInAttackFrame_) || d);
        if(!!e)
            return false;
        if(!!f)
            return false;
    }
    return retVal;
}