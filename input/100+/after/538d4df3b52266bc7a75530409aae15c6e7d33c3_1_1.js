function() {
        var i = 0;

        WTF.users = WTF.competition.getRacers();

        for(var userId in WTF.users) {
            WTF.users[userId].x = WTF.xStart;
            WTF.users[userId].y = (WTF.yStart + (WTF.yOffset * i++));
            WTF.users[userId].image = new Image();
            WTF.users[userId].image.src = 'img/runner'+i+'.png';
            WTF.users[userId].photo = new Image();
            WTF.users[userId].photo.src = WTF.users[userId].photoSrc;
            WTF.users[userId].playing = true;
            WTF.users[userId].position = null;
        }

        console.log(WTF.users);
    }