function add_to_selection(i)
			{
				var name = T.filelist[i];
				if(_selected[name]) return;
				
				_selected[name] = true;
				_selected_len++;
			}