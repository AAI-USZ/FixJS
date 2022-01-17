function insertItem(item)
{
	console.log(item);
	append = '<tr id="item-'+item.id+'"><td><input type="checkbox"></input></td>'+
		'<td>'+item.priority+'</td>'+
		'<td>'+item.item+'</td>'+
		'<td>'+item.price+'</td>'+
		'<td>'+item.qty+'&nbsp;'+item.units+'</td>'+
		'<td>'+item.tags+'</td>'+
		'<td><ul class="list-inline">'+
		'<li><a id="item-'+item.id+'" href="#" title="Edit"><i class="icon-pencil item-action-edit"></i></a></li>'+
		'<li><a id="item-'+item.id+'" href="#" title="Delete"><i class="icon-remove item-action-delete"></i></a></li>'+
		'</ul></td></tr>';
	console.log(append);
	$('#shoppinglist-items tbody').append(append);	  
}