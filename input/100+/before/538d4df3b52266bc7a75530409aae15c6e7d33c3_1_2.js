function(){
        if(WTF.race.status.indexOf("start") >= 0) {
            requestAnimationFrame(WTF.race.showRace);

            WTF.clearCanvas();

            WTF.rect(0,0, WTF.width, WTF.height);
            
            WTF.ctx.drawImage(WTF.background, 0, -500);
                
            WTF.framenumber++;
            
            if (WTF.framenumber % 100 === 0 && WTF.countdown){
                WTF.countdown--;
            }

            WTF.ctx.font = "bold 72px sans-serif";
            WTF.ctx.textAlign = "center";

            if (WTF.countdown >= 2){
                WTF.ctx.fillText(WTF.countdown-1, WTF.width / 2, 350);
            }

            if (WTF.countdown === 1){
                WTF.ctx.fillText("GO", WTF.width / 2, 350);
                WTF.race.status = "started";
            }

            for(var userId in WTF.users) {

                WTF.ctx.font = "bold 20px sans-serif";
                WTF.ctx.textAlign = "left";

                try {
                    WTF.ctx.fillText(WTF.users[userId].name, 100, (WTF.users[userId].y + 55));
                    WTF.ctx.drawImage(WTF.users[userId].image, WTF.users[userId].x, WTF.users[userId].y);
                } catch(e) {
                    console.log(WTF.users);
                    console.log(userId);
                }
                
                if(WTF.users[userId].x >= 926 && WTF.users[userId].playing === true) {
                    WTF.race.playersFinished++;                
                    WTF.users[userId].playing = false;
                    WTF.users[userId].name = WTF.users[userId].name+" ("+WTF.nextPosition+")";
                    WTF.socket.emit('playerFinished', {
                        'username': userId,
                        'position': WTF.nextPosition++
                    });

                    WTF.competition.setWinner(userId,WTF.race.stage);

                    if(WTF.race.playersFinished >= WTF.race.numWinners) {
                        WTF.race.status = "finished";
                        WTF.race.nextStage();
                    }
                }
            }
        }
    }