function ($o, v0) {

				//checkbox

					var pos = -1, v = v0, a = [], k = {};

					if (n(v)) {	

						if ($.type(v) != "array") v = [v0];

						$o.each(function(ind) {

							var $x = $(this), val = $x.val(), on = $x.is(":checked")

							if (v.indexOf(val)!=-1) {

								a.push(val);

								if (!on) $x.attr("checked", true);

							} else if (on) $x.attr("checked", false);

						});

					} else {

						$o.each(function(ind) {

							var $x = $(this);

							if ($x.is(":checked")) a.push($x.val());



						});

					}

					return a;

				}