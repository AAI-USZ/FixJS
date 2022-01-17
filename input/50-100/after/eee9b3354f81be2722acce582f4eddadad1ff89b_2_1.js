function(overrideFlags,player,otherID,isProjectile,isGrapple,startFrame,frame,otherPlayer)
{
    this.MoveOverrideFlags = overrideFlags;
    this.Frame = frame || 0;
    this.OtherAttackStartFrame = startFrame;

    this.Key = this.GetKey(player.id_,otherID);
    this.IsProjectile = isProjectile;
    this.IsGrapple = isGrapple;
    this.Player = player;
    this.OtherPlayer = otherPlayer;
    this.PlayerID = player.id_;
}