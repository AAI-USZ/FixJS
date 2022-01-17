function addTask(taskName, pomodoros, model, configName) {
    var tasks = "";
    
    for(var i = 0; i < model.count; i++) {
        console.log(model.get(i).taskId)
        tasks += model.get(i).taskId + "," + model.get(i).name + "," + model.get(i).pomodoros + "|"
    }
    
    var id = 0;
    
    if(model.count > 0)
        var id = parseInt(model.get(model.count-1).taskId) + 1
        
        tasks += id + "," + taskName + "," + pomodoros
        
        console.log(id)
        
        plasmoid.writeConfig(configName, tasks);
    model.append({"taskId":id,"name":taskName,"pomodoros":pomodoros});
}