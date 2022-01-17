function () {
    sceneIdx++;
    sceneIdx = sceneIdx % createSpriteTestLayerArr.length;

    return createSpriteTestLayerArr[sceneIdx]();
}