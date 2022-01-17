function populate_and_show_restore_dialog(){
    var list = $('#script_list');
    var script_obj;
    var idx, value, key, script_li;
	var len = localStorage.length;
    for (idx = 0; idx < len; idx++){
        key = localStorage.key(idx);
        if (key === '__current_scripts') continue;
        value = localStorage[key];
        script_obj = JSON.parse(value);
        if (script_obj.description){
            script_li = $('<li><span class="title">' + script_obj.title + '</span><button class="restore action">Restore</button><button class="delete action">Delete</button><button class="show_description action">Description</button><br /><span class="timestamp">Saved on ' + new Date(script_obj.date).toDateString() + '</span><p class="description hidden">' + script_obj.description + '<br /><p></li>');
        }else{
            script_li = $('<li><span class="title">' + script_obj.title + '</span><button class="restore action">Restore</button><button class="delete action">Delete</button><br /><span class="timestamp">Saved on ' + new Date(script_obj.date).toDateString() + '</span></li>');
        }
		
        script_li.data('scripts', script_obj.scripts); // avoid re-parsing later
        list.append(script_li);
    }
	$('button.action').button();
	$('#restore_dialog').dialog("open");
}