function insertItem(item)
{
	append = '<tr id="item-'+item.id+'"><td><input type="checkbox"></input></td>'+
		'<td>'+item.priority+'</td>'+
		'<td>'+item.item+'</td>'+
		'<td>'+item.price+'</td>'+
		'<td>'+item.qty+'&nbsp;'+item.units+'</td>'+
		'<td>'+item.tags+'</td>'+
		'<td><ul class="list-inline">'+
		'<li><a id="item-action-edit-'+item.id+'" href="#" title="Edit" class="item-action-edit"><i class="icon-pencil item-action-edit"></i></a></li>'+
		'<li><a id="item-action-delete-'+item.id+'" href="#" title="Delete" class="item-action-delete"><i class="icon-remove item-action-delete"></i></a></li>'+
		'</ul></td></tr>'+
		'<tr id="item-edit-'+item.id+'" style="display:none">'+
		'<td></td>'+
		'<td><input type="text" class="item-priority" value="'+item.priority+'"/></td>'+
		'<td><input type="text" class="item-item" value="'+item.item+'"/></td>'+
		'<td><input type="text" class="item-price" value="'+item.price+'"</td>'+
		'<td><input type="text" class="item-qty" value="'+item.qty+'"/>/<input type="text" class="item-units" value="'+item.units+'"/></td>'+
		'<td><input type="text" class="item-tags" value="'+item.tags+'"/></td>'+
		'<td><ul class="list-inline">'+
		'<li><a id="item-action-save-'+item.id+'" href="#" title="Save"><i class="icon-check item-action-save"></i></a></li>'+
		'<li><a id="item-action-cancel-'+item.id+'" href="#" title="Cancel"><i class="icon-remove item-action-cancel"></i></a></li>'+
		'</ul></td></tr>';
		
	$('#shoppinglist-items tbody').append(append);	  
}