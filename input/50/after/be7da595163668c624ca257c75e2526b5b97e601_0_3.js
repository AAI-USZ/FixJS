function stop() {
    //plasmoid.popupIcon = QIcon("ktip");
    
    console.log(plasmoid.popupIcon)
    
    tomatoidTimer.totalSeconds = 0;
    tomatoidTimer.running = false;
    inPomodoro = false;
    inBreak = false;
}