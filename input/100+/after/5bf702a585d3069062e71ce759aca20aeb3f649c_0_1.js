function showEditForm(isAdd)
{
	var form = document.getElementById('taskedit_form');
    form.isNoteDirty.value = 0;
    form.isTagDirty.value = 0;
    // enable iframe edit
    var d = getNoteFrameDocument();
    if (d) {
        d.designMode="On";
        $(d).unbind('keydown'); // so binding works repeatedly
        $(d).bind('keydown', function(e) {
            form.isNoteDirty.value=1;
            var code= (e.keyCode ? e.keyCode : e.which);
            if (code == 13 && d.queryCommandValue('strikethrough')=='true') {
                d.execCommand('strikethrough', false, null);
            }
        })
        $(d).unbind('contextmenu'); // so binding works repeatedly
        $(d).bind('contextmenu', function() {
            form.isNoteDirty.value=1;
        })
    }
	if(isAdd)
	{
		$('#page_taskedit').removeClass('mtt-inedit').addClass('mtt-inadd');
		form.isadd.value = 1;
		if(_mtt.options.autotag) form.tags.value = _mtt.filter.getTags();
		if($('#task').val() != '')
		{
            form.task.value = $('#task').val();
            $('#task').val('');
		}
	}
	else {
		$('#page_taskedit').removeClass('mtt-inadd').addClass('mtt-inedit');
		form.isadd.value = 0;
	}

	flag.editFormChanged = false;
	_mtt.pageSet('taskedit');
}