function(evt){

			$['_each'](findHdls(el, evt, fn, sel), function(hdl){

				delete handlers[id][hdl.i];

				unbind(el, hdl.e, hdl.del || hdl.fn);

			});

		}