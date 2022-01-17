function(attackFlags,hitState,flags,frame,damage,isProjectile,hitX,hitY,attackDirection,fx,fy)
{
    if(this.IsDead())
        return;

    var move = this.moves_[_c3("_",POSE_FLAGS.STANDING,"_hr_dizzy")];
    if(!!move)
    {
        this.ResetCombo();
        this.GetFlags().Player.Add(PLAYER_FLAGS.DIZZY);
        this.GetFlags().Player.Add(PLAYER_FLAGS.IMMOBILE);
        var direction = this.GetAttackDirection(attackDirection);
        this.SetCurrentAnimation({Animation:move,StartFrame:frame,Direction:this.direction_,AttackDirection:direction});
        this.Flags.Player.Add(PLAYER_FLAGS.AIRBORNE);
        this.PerformJump(direction * move.Vx,move.Vy);
        this.SpawnDizzy(frame);
        this.QueueDizzy();
        this.maxDizzyValue_ += CONSTANTS.DIZZY_INC;
    }
}