function()
{
    var otherFront = 0;
    var otherBack = 0;

    var myFront = 0;
    var myBack = 0;


    if(this.team_ == 1)
    {
        otherFront = this.GetMatch().teamB_.Players[this.target_].GetAbsFrontX();
        otherBack = this.GetMatch().teamB_.Players[this.target_].GetAbsBackX();

        myFront = this.GetAbsFrontX();
        myBack = this.GetAbsBackX();
    }
    else
    {
        otherFront = this.GetMatch().teamA_.Players[this.target_].GetAbsFrontX();
        otherBack = this.GetMatch().teamA_.Players[this.target_].GetAbsBackX();

        myFront = this.GetAbsFrontX();
        myBack = this.GetAbsBackX();
    }

    if((myFront < otherFront) && (this.direction_ != -1) && (!this.mustChangeDirection_))
        this.TurnAround();
    else if((myBack > otherBack) && (this.direction_ != 1) && (!this.mustChangeDirection_))
        this.TurnAround();
}