function(data) {
	console.log(data);
    if (data.action == 'player') color = '#9f11c3';
    if (data.action == 'level') color = '#739bc8';
    if (data.action == 'speak') color = '#000';
    
    var level = (data.level != undefined) ? '['+data.level+'] ' : '';
    addToChat(level+'['+data.player+']', data.message, color);
}