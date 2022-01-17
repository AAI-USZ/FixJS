function keyPress(e) {
    if (!e) {
        e = event;
    }
    doInputAction(e);
    return suppressDefault(e);
}