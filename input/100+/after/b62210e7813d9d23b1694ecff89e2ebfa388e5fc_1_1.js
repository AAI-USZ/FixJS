function initShoppingList() {
	addApplication({'name' : 'shoppinglist', 'title' : 'OI Shopping List', 'icon-small' : 'images/oi-shoppinglist.png', 'icon-big' : 'images/ic_launcher_shoppinglist.png'});
    
	// Hide OI Shopping List by default
	// TODO: Remove this when OI Shopping List support is fully completed
	/*set = Settings.get();
	set['showApps']['shoppinglist'] = false;
	Settings.set('showApps', set['showApps']);*/
	
	// Fetch OI Notepad's HTML fragment and load it
	$.get('apps/shoppinglist/shoppinglist.html', function(data) {
	    $('#content').append(data);
	    insertItem({id:1,priority:1,item:'Maggi',price:100,qty:1,units:'kg',tags:'food'});
	    insertItem({id:2,priority:2,item:'Chips',price:100,qty:1,units:'kg',tags:'food'});
	});
}