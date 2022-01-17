function nextTileMapAction() {
    ++tileMapIdx;
    tileMapIdx = tileMapIdx % TileMapTests.length;
    return TileMapTests[tileMapIdx]();
}