function add_to_selection(i)
			{
				res = T.GRID.getRow(i);
				if(!res) return;
				if(_selected[res['name']]) return;
				
				_selected[res['name']] = true;
				_selected_len++;
			}