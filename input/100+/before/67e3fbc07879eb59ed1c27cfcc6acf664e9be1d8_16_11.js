function(attackState,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy)
{
    var move = this.moves_[_c3("_",POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING,"_hr_trip")];
    if(!!move)
    {
        this.Flags.Pose.Add(POSE_FLAGS.AIRBORNE);
        var direction = this.GetAttackDirection(attackDirection);
        this.SetCurrentAnimation({Animation:move,StartFrame:frame,Direction:this.direction_,AttackDirection:direction});
        this.PerformJump(direction * move.Vx * fx,move.Vy * fy);
    }
}