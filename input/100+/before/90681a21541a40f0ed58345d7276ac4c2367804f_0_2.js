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

    var i = 0;

    for(var userId in WTF.users) {
        //$('.racers ol').append('<li><img src="'+WTF.users[userId].photo.src+'" /> '+WTF.users[userId].name+'</li>')
        WTF.users[userId].x = WTF.xStart;
        WTF.users[userId].y = (WTF.yStart + (WTF.yOffset * i++));
        WTF.users[userId].image = new Image();
        WTF.users[userId].image.src = 'img/runner'+i+'.png';
        WTF.users[userId].photo = new Image();
        WTF.users[userId].photo.src = WTF.users[userId].photoSrc;
        WTF.users[userId].playing = true;
    }

    WTF.openingCeremony();
}