function (index) {
    switch (index) {
        case 0:
            return new SpriteProgressToRadial();
        case 1:
            return new SpriteProgressToHorizontal();
        case 2:
            return new SpriteProgressToVertical();
        case 3:
            return new SpriteProgressToRadialMidpointChanged();
        case 4:
            return new SpriteProgressBarVarious();
        case 5:
            return new SpriteProgressBarTintAndFade();
        case 6:
            return new SpriteProgressWithSpriteFrame();
    }
    return null;
}