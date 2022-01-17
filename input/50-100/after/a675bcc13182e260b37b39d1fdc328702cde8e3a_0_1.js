function startBreak() {
    console.log(completedPomodoros)
    if(completedPomodoros % pomodorosPerLongBreak == 0) {
        tomatoidTimer.totalSeconds = longBreakLenght * 60;
    } else {
        tomatoidTimer.totalSeconds = shortBreakLenght * 60;
    }
    
    tomatoidTimer.running = true;
    inPomodoro = false;
    inBreak = true;
}