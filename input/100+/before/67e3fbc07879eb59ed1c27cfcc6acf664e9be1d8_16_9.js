function(frame,attackDirection)
{
    var move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_dead")];
    if(!!move)
    {
        attackDirection = this.GetRelativeDirection(attackDirection);
        var direction = this.GetAttackDirection(attackDirection);
        this.SetCurrentAnimation({Animation:move,StartFrame:frame,Direction:this.direction_,AttackDirection:direction});
        this.Flags.Player.Add(PLAYER_FLAGS.AIRBORNE);
        this.PerformJump(direction * move.Vx,move.Vy);
    }
}