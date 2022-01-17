function doTask(id) {
    var removedTask = removeIncompleteTask(id);
    var split = removedTask.split(",");
    
    console.log(removedTask);
    console.log(split);
    
    insertCompleteTask(split[0], split[1]);
}