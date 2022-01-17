function backTileMapAction() {
    --tileMapIdx;
    if (tileMapIdx < 0) {
        tileMapIdx += TileMapTests.length;
    }
    return TileMapTests[tileMapIdx]();
}