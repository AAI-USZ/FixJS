function startTask(id) {
    console.log(id)
    tomatoidTimer.taskId = id;
    tomatoidTimer.totalSeconds = 5;
    tomatoidTimer.running = true;
    inPomodoro = true;
    inBreak = false;
}