function StartQuickMatch()
{
    u1_.SetChar(CHARACTERS.KEN);
    u2_.SetChar(CHARACTERS.RYU);

    game_.StartMatch(true,[u1_],[u2], kensStage_);
}