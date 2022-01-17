function StartMayhem()
{
    var p1_ = Player.prototype.CreateRyu(u1_);
    var p2_ = Player.prototype.CreateKen(u2_);
    var p3_ = Player.prototype.CreateRyu(u3_);
    var p4_ = Player.prototype.CreateKen(u4_);
    game_.StartMatch([p1_, p2_],[p3_,p4_], kensStage_);
    game_.Pause();
    debug_.T1TestAI(0);
    debug_.T2TestAI(0);
    debug_.T2TestAI(1);
}