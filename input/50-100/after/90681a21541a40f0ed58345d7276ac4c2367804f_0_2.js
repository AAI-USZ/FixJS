function() {
    if(WTF.canvasY <= WTF.canvasMaxY) {
        requestAnimationFrame(WTF.openingCeremony);
        WTF.drawOpeningCeremony();
    } else {
        WTF.gameInit();
    }
}