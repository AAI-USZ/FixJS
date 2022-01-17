function schedCycle()
{
    var names = schedGetHead()

    for(var i in names) {
        schedRemovePlayer(names[i])
        schedAddPlayer(names[i])
    }
}