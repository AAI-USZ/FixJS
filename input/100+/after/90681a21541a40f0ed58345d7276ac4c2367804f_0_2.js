function() {
    WTF.raceStatus = "starting";

    WTF.steps = 10,
    WTF.xStart = 10,
    WTF.yStart = 261,
    WTF.xOffset = 90,
    WTF.yOffset = 90,
    WTF.raceStatus = "finished",
    WTF.key1 = false,
    WTF.key2 = false,
    WTF.key3 = false,
    WTF.key4 = false,
    WTF.framenumber = 0,
    WTF.nextPosition = 1,
    WTF.countdown = 4;

    WTF.setupPlayers();

    WTF.openingCeremony();
}