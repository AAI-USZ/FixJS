function()
{
    this.StopGettingDizzy();
    if(!!this.otherAnimations_.Dizzy[this.dizzyIndex_])
    {
        this.otherAnimations_.Dizzy[this.dizzyIndex_].Animation.Reset();
        this.otherAnimations_.Dizzy[this.dizzyIndex_].Element.style.display = "none";
    }
    this.GetFlags().Player.Remove(PLAYER_FLAGS.DIZZY);
    if(!this.IsDead())
        this.GoToStance();
    this.StopDizzyAudio();
}