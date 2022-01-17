function setSort(v, init)
{
	$('#listmenucontainer .sort-item').removeClass('mtt-item-checked').children('.mtt-sort-direction').text('');
	if(v == "DEFAULT") $('#sortByHand').addClass('mtt-item-checked');
	else if(v=="PRIORITY_DESC") $('#sortByPrio').addClass('mtt-item-checked').children('.mtt-sort-direction').text('↓');
    else if(v=="PRIORITY_ASC") $('#sortByPrio').addClass('mtt-item-checked').children('.mtt-sort-direction').text('↑');
	else if(v=="DUE_DATE_DESC") $('#sortByDueDate').addClass('mtt-item-checked').children('.mtt-sort-direction').text('↓');
    else if(v=="DUE_DATE_ASC") $('#sortByDueDate').addClass('mtt-item-checked').children('.mtt-sort-direction').text('↑');
	else if(v=="DATE_CREATED_DESC") $('#sortByDateCreated').addClass('mtt-item-checked').children('.mtt-sort-direction').text('↓');
    else if(v=="DATE_CREATED_ASC") $('#sortByDateCreated').addClass('mtt-item-checked').children('.mtt-sort-direction').text('↑');
	else if(v=="LAST_UPDATED_DESC") $('#sortByDateModified').addClass('mtt-item-checked').children('.mtt-sort-direction').text('↓');
    else if(v=="LAST_UPDATED_ASC") $('#sortByDateModified').addClass('mtt-item-checked').children('.mtt-sort-direction').text('↑');
	else return;

	curList.sort = v;
	if(v == "DEFAULT" && !flag.readOnly)
        $("#tasklist").sortable('enable');
	else
        $("#tasklist").sortable('disable');
	
	if(!init)
	{
		changeTaskOrder();
		if(!flag.readOnly) _mtt.db.request('setSort', {list:curList.id, sort:curList.sort, project:_mtt.project});
	}
}