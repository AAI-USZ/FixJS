function initShoppingList() {
	console.log('Init shoppinglist');
	addApplication({'name' : 'shoppinglist', 'title' : 'OI Shopping List', 'icon-small' : 'images/oi-shoppinglist.png', 'icon-big' : 'images/ic_launcher_shoppinglist.png'});
    
	// Fetch OI Notepad's HTML fragment and load it
	$.get('apps/shoppinglist/shoppinglist.html', function(data) {
	    $('#content').append(data);
	    insertItem({id:1,priority:1,item:'Maggi',price:100,qty:1,units:'kg',tags:'food'});
	});
}