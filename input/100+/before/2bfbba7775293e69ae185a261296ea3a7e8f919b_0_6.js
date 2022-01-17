function record(id, num, snt, sst, snd, old, nw, mod, atn){
	var text = "";
	text += '<input type="hidden" name = "corr.' + id + '.num" id="corr.' + id + '.num" value="'+num+'"/>';
        text += '<input type="hidden" name = "corr.' + id + '.snt" id="corr.' + id + '.snt" value="'+snt+'"/>';
        text += '<input type="hidden" name = "corr.' + id + '.sst" id="corr.' + id + '.sst" value="'+sst+'"/>';
        text += '<input type="hidden" name = "corr.' + id + '.snd" id="corr.' + id + '.snd" value="'+snd+'"/>';
        text += '<input type="hidden" name = "corr.' + id + '.old" id="corr.' + id + '.old" value="'+old+'"/>';
        text += '<input type="hidden" name = "corr.' + id + '.new" id="corr.' + id + '.new" value="'+nw+'"/>';
        text += '<input type="hidden" name = "corr.' + id + '.mod" id="corr.' + id + '.mod" value="'+mod+'"/>';
        text += '<input type="hidden" name = "corr.' + id + '.atn" id="corr.' + id + '.atn" value="'+atn+'"/>';
	$("#HITend").after(text);
       return false;
//	$("#user_survey").after('<input type="text" name="name" id="atest" value="'+value+'" />');
}