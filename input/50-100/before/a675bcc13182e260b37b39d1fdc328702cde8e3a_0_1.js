function startBreak() {
    console.log(completedPomodoros)
    if(completedPomodoros % 4 == 0) {
        tomatoidTimer.totalSeconds = 15;
    } else {
        tomatoidTimer.totalSeconds = 5;
    }
    
    tomatoidTimer.running = true;
    inPomodoro = false;
    inBreak = true;
}