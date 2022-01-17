function userMove(position) {

    // Can't issue a new play request while an existing request is pending.
    if (requestPending) {
        return;
    }
    requestPending = true;

    scenario[position] = userIsX ? PositionState.X : PositionState.O;
    askComputerToMove();
}