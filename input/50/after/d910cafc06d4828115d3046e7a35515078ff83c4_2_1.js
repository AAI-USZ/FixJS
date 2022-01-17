function()
		{
			socket.emit('bridge-event', {name:ORG_NAME, inv:OUR_SERVICES});
			$('#'+category.name+' .avail').text(category.avail +' / '+category.total);
		}