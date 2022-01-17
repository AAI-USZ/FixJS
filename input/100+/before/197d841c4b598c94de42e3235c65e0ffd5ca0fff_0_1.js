function printGrid(target, id, table)
{
	var src = '<table id="resultset-' + id + '" class="sortable tablesorter resultset-' + id + '" border="0" cellpadding="0" cellspacing="1"><thead class="ui-widget-header noborder"><tr>';
    if (isUpdateResult(table))
		src += '<th>modified_tuples</th>';
    else
    {
    	for(var j = 0; j < table.schema.length; j++)
	    	src += '<th>' + ( table.schema[j].name == "" ? ("Column " + (j+1)) : table.schema[j].name ) + '</th>';
    }
	src += '</tr></thead><tbody>';
	for(var j = 0; j < table.data.length; j++)
	{
		src += '<tr>';
		for(var k = 0; k < table.data[j].length; k++)
			src += '<td align="' + (table.schema[k].type == 9 ? 'left' : 'right') + '">' + table.data[j][k] + '</td>';
		src += '</tr>';
	}
	src += '</tbody></table>';
	$(target).append(src);
    sorttable.makeSortable(document.getElementById('resultset-' + id));
}