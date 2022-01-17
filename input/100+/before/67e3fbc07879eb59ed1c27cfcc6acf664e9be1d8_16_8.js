function(frame,attackDirection)
{
    if(!this.isLosing_)
    {
        this.isLosing_ = true;
        this.forceImmobile_ = true;
        this.TakeDamage(this.GetHealth());
        var frame = this.GetMatch().GetCurrentFrame();
        var direction = attackDirection || -this.direction_;

        this.Flags.Player.Add(PLAYER_FLAGS.DEAD);
        this.GetMatch().DefeatTeam(this.team_,attackDirection,frame,this.id_);
    }
}