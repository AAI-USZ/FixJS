function ($o, v) {

			//object is jQuery.my instance

				if ($o) return $o.my("data", v, true);

				else return v;

			}