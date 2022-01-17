function (index) {
    switch (index) {
        case 0:
            return new SpriteProgressToRadial();
        case 1:
            return new SpriteProgressToHorizontal();
        case 2:
            return new SpriteProgressToVertical();
    }
    return null;
}