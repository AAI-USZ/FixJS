function undoTask(id) {    
    var removedTask = removeCompleteTask(id);
    var split = removedTask.split(",");
    
    console.log(removedTask);
    console.log(split);
    
    insertIncompleteTask(split[0], split[1]);    
}