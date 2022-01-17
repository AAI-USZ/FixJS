function(hdl){

				delete handlers[id][hdl.i];

				unbind(el, hdl.e, hdl.del || hdl.fn);

			}