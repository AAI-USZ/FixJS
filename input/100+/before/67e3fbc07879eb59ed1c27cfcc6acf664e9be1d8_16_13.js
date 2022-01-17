function(attackState,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy)
{
    var move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_knockdown")];
    if(!!move)
    {
        this.StopGettingDizzy();
        var direction = this.GetAttackDirection(attackDirection);
        this.SetCurrentAnimation({Animation:move,StartFrame:frame,Direction:this.direction_,AttackDirection:direction});
        this.Flags.Pose.Add(POSE_FLAGS.AIRBORNE);
        this.PerformJump(direction * move.Vx * fx,move.Vy * fy);
    }
}