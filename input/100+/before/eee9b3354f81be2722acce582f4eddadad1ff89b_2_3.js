function(key,index)
{
    var first = index == 0 ? this.Actions[key][0] : this.Actions[key][1];
    var second = index == 0 ? this.Actions[key][1] : this.Actions[key][0];


    if(!second)
    {
        return true;
    }
    if(first.MoveOverrideFlags.HasAllowOverrideFlag(OVERRIDE_FLAGS.NONE))
    {
        return false;
    }
    return second.MoveOverrideFlags.HasOverrideFlag(OVERRIDE_FLAGS.ALL)
        || first.MoveOverrideFlags.HasAllowOverrideFlag(OVERRIDE_FLAGS.ALL)
        || second.MoveOverrideFlags.HasOverrideFlag(first.MoveOverrideFlags.AllowOverrideFlags)
        || first.IsProjectile
        ;
}