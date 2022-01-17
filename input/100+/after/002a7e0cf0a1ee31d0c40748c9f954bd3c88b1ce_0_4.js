function save_named_scripts(){
    var title = $('#script_name').val();
    var description = $('#script_description').val();
    var date = Date.now();
    if (title){
        if (localStorage[title]){
            if (!confirm('A script with that title exist. Overwrite?')){
                return;
            }
        }
        localStorage[title] = JSON.stringify({
            title: title,
            description: description,
            date: date,
            scripts: scripts_as_object()
        });
        $("#save_dialog").dialog("close");
    }
	else
        alert("You must enter a name");
}