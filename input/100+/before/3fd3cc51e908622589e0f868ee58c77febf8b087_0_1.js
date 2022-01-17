function handle_row_select(row, idx, ev)
	{
		var isDblClick = false;
		var name = row['name'] || null;
		if(!name) return;

		if( _last_clicked_time && _last_clicked_idx == idx )
		{
			var delta = (new Date().getTime() - _last_clicked_time.getTime());

			if(delta < 500) isDblClick = true;
		}

		try
		{
			ev.preventDefault();
		}catch(exc)
		{

		}
		
		try
		{
			ev.stopPropagation();
		}catch(exc)
		{
			
		}

		document.getElementById('address').focus();
		document.getElementById('address').blur();

		if(isDblClick)
		{
			if(row.type == 'dir') I.change_address(name);
			else E.edit_file_for_item(name);
		}



		if(ev.ctrlKey || ev.metaKey)
		{
			if(_selected[name])
			{
				delete _selected[name];
				_selected_len--;
				
				//_last_selected = null;
			}else
			{
				//if(_selected_len > 0) _last_selected = null;
				_selected[name] = true;
				_selected_len++;
			}
		}else if(ev.shiftKey)
		{
			function add_to_selection(i)
			{
				res = T.GRID.getRow(i);
				if(!res) return;
				if(_selected[res['name']]) return;
				
				_selected[res['name']] = true;
				_selected_len++;
			}
			
			var i, res;
			
			var num = Math.abs( idx - _last_clicked_idx ) + 1;
			if(num > 500)
			{
				alert('Selection of more than 500 elements at once is not supported. You tried to select '+num+' items.');
				return;
			}
			
			if( idx > _last_clicked_idx )
			{
				for(i = _last_clicked_idx; i <= idx; i++)
				{
					add_to_selection(i);
				}
			}else
			{
				for(i = idx; i <= _last_clicked_idx; i++)
				{
					add_to_selection(i);
				}
			}
			
		}else
		{
			_selected = {};
			_selected[name] = true;
			_selected_len = 1;
		}


		T.GRID.redraw();
		T.redraw_menu();


		_last_clicked_idx = idx;
		_last_clicked_time = new Date();
	}