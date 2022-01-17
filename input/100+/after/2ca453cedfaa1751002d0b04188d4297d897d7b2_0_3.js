function ($o,v) {

					if (n(v)) {

						$o.val(String(v||""));	

						if ($o.selectmenu) {

						//now ditinguish between jQ selectmenu plugin

						//and jQ Mobile

							if ($o.selectmenu("option").theme!=null) $o.selectmenu("refresh",true);

							else {

								$o.find("option").each(function(i){

									var $x = $(this);

									if (f.extval($x) == v) $o.selectmenu("value",i);

								})

							}						

						}

					}	

				}