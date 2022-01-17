function() {
    if(WTF.remainingPlayers <= 0) {
        WTF.startRace();
        return;
    }
    requestAnimationFrame(WTF.updatePlayers);

    WTF.ctx.drawImage(WTF.background, 0, 0);
    WTF.ctx.drawImage(WTF.qrImage, 330, 80, 300, 300);

    WTF.ctx.font = "bold 36px sans-serif";
    WTF.ctx.textAlign = "center";
    WTF.ctx.fillStyle = "black";
    WTF.ctx.strokeStyle = "black";
    WTF.ctx.fillText("Waiting for "+WTF.remainingPlayers+ " players", (WTF.width /2), 450);
    
    /*for(var i=0; i<WTF.playerThumbs.length; i++) {
        WTF.ctx.drawImage(WTF.qrImage, 330, 80, 300, 300);
    }*/

}