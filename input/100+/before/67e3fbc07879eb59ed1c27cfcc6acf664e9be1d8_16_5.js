function()
{
    this.StopGettingDizzy();
    this.otherAnimations_.Dizzy[this.dizzyIndex_].Animation.Reset();
    this.otherAnimations_.Dizzy[this.dizzyIndex_].Element.style.display = "none";
    this.GetFlags().Player.Remove(PLAYER_FLAGS.DIZZY);
    this.GoToStance();
    this.StopDizzyAudio();
}