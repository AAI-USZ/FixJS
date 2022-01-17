function()
{
    if(!this.mustChangeDirection_)
    {
        if(this.GetPhysics().IsRightMostPlayer(this.id_) && this.direction_ == -1)
            this.TurnAround();
        else if(this.GetPhysics().IsLeftMostPlayer(this.id_) && this.direction_ == 1)
            this.TurnAround();
        else
        {
            if((this.direction_ == 1) && !this.GetPhysics().IsAnyPlayerFromOtherTeamMoreLeft(this.GetMidX(),this.team_))
                this.TurnAround();
            else if((this.direction_ == -1) && !this.GetPhysics().IsAnyPlayerFromOtherTeamMoreRight(this.GetMidX(),this.team_))
                this.TurnAround();
        }
    }
}