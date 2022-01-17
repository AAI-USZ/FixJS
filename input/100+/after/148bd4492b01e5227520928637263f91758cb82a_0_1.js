function(attackDirection)
{
    this.isLosing_ = true;
    this.forceImmobile_ = true;
    this.TakeDamage(this.GetHealth());
    var frame = this.GetMatch().GetCurrentFrame();
    var direction = attackDirection || -this.direction_;
    this.AbortThrow();

    this.flags_.Player.Add(PLAYER_FLAGS.DEAD);
    this.KnockDownDefeat(frame,attackDirection);
    this.QueueSound("audio/" + this.name_.toLowerCase() + "/dead.zzz");
    this.ClearInput();
}