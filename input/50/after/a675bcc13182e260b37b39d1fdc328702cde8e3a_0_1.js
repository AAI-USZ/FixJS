function startTask(id) {
    console.log(id)
    tomatoidTimer.taskId = id;
    tomatoidTimer.totalSeconds = pomodoroLenght * 60;
    tomatoidTimer.running = true;
    inPomodoro = true;
    inBreak = false;
}