function StartDramaticBattle()
{
    u2_.SetChar(CHARACTERS.KEN);
    u1_.SetChar(CHARACTERS.RYU,true);
    u3_.SetChar(CHARACTERS.KEN,true);

    game_.Pause();
    game_.StartMatch(true,[u2_],[u1_,u3_], kensStage_, StartDramaticBattleAI);
}