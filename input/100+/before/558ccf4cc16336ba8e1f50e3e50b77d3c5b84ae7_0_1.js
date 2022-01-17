function calc(e)
		{
			//alert('calc called ');
			e=(e)?e:event;
			var el=e.target||e.srcElement;
			var _id=el.getAttribute(ie ? 'className' : 'class');

            // eliminate bad numbers
            _aval=el.value;
            if (radix===',') {
                _aval = _aval.split(',').join('.');
            }
            if (radix!=='X' && _aval != '-' && _aval != '.' && _aval != '-.' && _aval != parseFloat(_aval)) {
                el.value = "";
            }

			//vert_[id] horo_[id] in class trigger vert or horo calc on row[id]
			if(_id.match('vert_','ig'))
			{
				var vid = get_an_id(_id,'vert_');
				calc_vert(vid);
			};
			if(_id.match('horo_','ig'))
			{
				var hid = get_an_id(_id,'horo_');
				calc_horo(hid);
			};
			//check for grand total
			switch(_grand)
			{
				case 1:
				//run calc across last row
					calc_horo(_bits.length - 1);
				 	break;
				case 2:
				//run calc on last col
					calc_vert(_bits[0].length - 1);
					break;
			}
            checkconditions($(el).val(), $(el).attr('name'), $(el).attr('type'));
			return(true);
		}