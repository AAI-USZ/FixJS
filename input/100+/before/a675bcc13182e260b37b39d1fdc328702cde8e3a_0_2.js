function removeTask(id, model, configName) {
    console.log(id)
    
    var tasks = "";
    var index = 0;
    
    for(var i = 0; i < model.count; i++) {
        if(id != model.get(i).taskId) {
            tasks += model.get(i).taskId + "," + model.get(i).name + "," + model.get(i).pomodoros;
            if(i < model.count + 1) {
                tasks += "|";
            }
        } else {
            index = i;
        }
    }
    
    plasmoid.writeConfig(configName, tasks);
    model.remove(index);
}