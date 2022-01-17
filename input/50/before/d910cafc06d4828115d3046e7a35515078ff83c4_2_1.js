function()
		{
			socket.emit('bridge-event', ORG_DATA);
			$('#'+category.name+' .avail').text(category.avail +' / '+category.total);
		}