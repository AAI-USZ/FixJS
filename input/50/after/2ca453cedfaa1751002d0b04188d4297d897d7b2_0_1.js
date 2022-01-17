function ($o, v) {

			//object is jQuery.my instance

				if ($o && $o.my) {

					var r=  $o.my("data", v, true);

					return r;

				}

				else return v||null;

			}