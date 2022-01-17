function()
{
	var statusBar = QueryTab.find('.workspacestatusbar span.status');
	if (DataSource.val() == 'Disconnected')
	{
		statusBar.text('Connect to a datasource first.');
		statusBar.addClass('error');
		return;
	}
	else
		statusBar.removeClass('error');
	var connection = VoltDB.Connections[DataSource.val()];
	var source = '';
	var source = QueryTab.find('.querybox').getSelectedText();
	if (source != null)
	{
		source = source.replace(/^\s+|\s+$/g,'');
		if (source == '')
			source = QueryTab.find('.querybox').val();
	}
	else
		source = QueryTab.find('.querybox').val();

	source = source.replace(/^\s+|\s+$/g,'');
	if (source == '')
		return;

	var format = $('#'+$('#result-format label[aria-pressed=true]').attr('for'))[0].value;
	var target = QueryTab.find('.resultbar');
	$("#execute-query").button("disable");
	if (format == 'grd')
	{
		target.html('<div class="wrapper gridwrapper"></div>');
		target = target.find('.wrapper');
	}
	else
	{
		target.html('<div class="wrapper"><textarea></textarea></div>');
		target = target.find('textarea');
	}
	var statements = SQLParser.parse(source);
	var start = (new Date()).getTime();
    var connectionQueue = connection.getQueue();
	connectionQueue.Start();
	for(var i = 0; i < statements.length; i++)
	{
		var id = 'r' + i;
		var callback = new executeCallback(format, target, id);
		if (/^execute /i.test(statements[i]))
			statements[i] = 'exec ' + statements[i].substr(8);
		if (/^exec /i.test(statements[i]))
		{
			var params = SQLParser.parseProcedureCallParameters(statements[i].substr(5));
			var procedure = params.splice(0,1)[0];
			connectionQueue.BeginExecute(procedure, params, callback.Callback);
		}
		else
		{
                    var canRun = true;
                    if (!/count\(.*\)/.test(statements[i].toLowerCase()) && statements[i].toLowerCase().indexOf('order by') == -1)
                        canRun = confirm('Running a non-deterministic query can be dangerious, consider adding an order by clause. Are you sure you want to proceed?');

                    if (canRun)
                        connectionQueue.BeginExecute('@AdHoc', statements[i].replace(/[\r\n]+/g, " ").replace(/'/g,"''"), callback.Callback);
		}
	}
	connectionQueue.End(function(state,success) {
		var totalDuration = (new Date()).getTime() - state;
        if (success)
            statusBar.text('Query Duration: ' + (totalDuration/1000.0) + 's');
        else
        {
    		statusBar.addClass('error');
            statusBar.text('Query error | Query Duration: ' + (totalDuration/1000.0) + 's');
        }
		$("#execute-query").button("enable");
	}, start);
}