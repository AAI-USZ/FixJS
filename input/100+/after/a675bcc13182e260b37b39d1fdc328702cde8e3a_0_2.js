function removeTask(id, model, configName) {    
    var tasks = "";
    var index = 0;
    
    for(var i = 0; i < model.count; i++) {
        if(id != model.get(i).taskId) {
            if(tasks != "") {
                tasks += "|";
            }
            tasks += model.get(i).taskId + "," + model.get(i).name + "," + model.get(i).pomodoros;
            
        } else {
            index = i;
        }
    }
    
    console.log(tasks);
    plasmoid.writeConfig(configName, tasks);
    model.remove(index);
}