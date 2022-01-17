function startTask(id) {
    //plasmoid.popupIcon = QIcon("yakuake");
    
    console.log(plasmoid.popupIcon)
    tomatoidTimer.taskId = id;
    tomatoidTimer.totalSeconds = pomodoroLenght * 60;
    tomatoidTimer.running = true;
    inPomodoro = true;
    inBreak = false;
}