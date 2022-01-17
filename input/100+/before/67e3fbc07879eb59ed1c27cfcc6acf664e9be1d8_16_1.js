function(distance, airborneFlags)
{
    var retVal = false;
    var player = this.GetPhysics().GetGrappledPlayer(this.team_,this.GetAbsFrontX(),this.y_,distance,airborneFlags,this.IsAirborne());
    if(!!player)
    {
        retVal = true;
        player.SetPendingGrapple(true);
    }

    return retVal;
}