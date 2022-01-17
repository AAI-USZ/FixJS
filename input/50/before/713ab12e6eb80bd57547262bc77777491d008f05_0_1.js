function schedCycle()
{
    var names = schedGetHeadRandomized()

    for(var i in names) {
        schedRemovePlayer(names[i])
        schedAddPlayer(names[i])
    }
}