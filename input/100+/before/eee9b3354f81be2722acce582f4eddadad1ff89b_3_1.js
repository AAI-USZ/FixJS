function StartMayhem()
{
    var p1_ = Player.prototype.CreateKen(u1_);
    var p2_ = Player.prototype.CreateRyu(u1_);
    var p4_ = Player.prototype.CreateKen(u2_);
    game_.StartMatch([p1_, p2_],[p4_], kensStage_);
    game_.Pause();
    debug_.T1TestAI(0);
    debug_.T1TestAI(1);
}