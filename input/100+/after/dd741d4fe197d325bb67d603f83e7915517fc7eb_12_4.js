function()
{
    var move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_eject")];
    if(!!move)
    {
        this.SetBeingGrappled(false);
        //attackDirection = this.GetRelativeDirection(attackDirection);
        var direction = this.GetAttackDirection(-this.direction_);
        this.SetCurrentAnimation({Animation:move,StartFrame:this.GetGame().GetCurrentFrame(),Direction:this.direction_,AttackDirection:direction,Vx:0,Vy:0});
        this.flags_.Pose.Add(POSE_FLAGS.AIRBORNE);
        this.PerformJump(direction * move.vx_ * 0,move.vy_ * 0);
    }
}