function(event, model)
		{
			switch(event)
			{
			case 'add':
				this.add_event(model, {from_event: true}); break;
			case 'reset':
				this.refresh(); break;
			case 'clear':
				this.clear(); break;
			case 'remove':
				this.remove_event(model, {from_event: true}); break;
			case 'change':
				this.change_event(); break;
			case 'sort':
				this.refresh(); break;
			}
		}