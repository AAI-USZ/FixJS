function doTask(id, name, pomodoros) {    
    insertCompleteTask(name, pomodoros);
    removeIncompleteTask(id);
}