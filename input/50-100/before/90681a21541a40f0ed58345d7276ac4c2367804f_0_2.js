function() {
    console.log(WTF.canvasY, WTF.canvasMaxY);
    if(WTF.canvasY <= WTF.canvasMaxY) {
        requestAnimationFrame(WTF.openingCeremony);
        WTF.drawOpeningCeremony();
    } else {
        WTF.gameInit();
    }
}