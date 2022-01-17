function(attackState,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy)
{
    var move = this.moves_[_c3("_",POSE_FLAGS.AIRBORNE,"_hr_air")];
    if(!!move)
    {   
        var direction = -this.GetAttackDirection(attackDirection);
        this.SetCurrentAnimation({Animation:move,StartFrame:frame,Direction:this.direction_,AttackDirection:direction});
        this.PerformJump(direction * move.Vx * fx,move.Vy * fy);
    }
    
}