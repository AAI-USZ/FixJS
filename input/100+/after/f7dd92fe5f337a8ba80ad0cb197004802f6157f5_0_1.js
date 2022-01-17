function(e){
				var gMatch = {
					"Black": {
						"S": 1,
						"M": 2,
						"L": 3,
						"XL": 4,
						"XXL": 5
					},
					"Grey": {
						"S": 6,
						"M": 7,
						"L": 8,
						"XL": 9,
						"XXL": 10
					},
					"Orange": {
						"S": 11,
						"M": 12,
						"L": 13,
						"XL": 14,
						"XXL": 15
					}
				}

				// var size = $("#theSize option:selected").val();
				// var color = $("#theColor option:selected").val();
				var size = theSize.val();
				var color = theColor.val();

				$("[name=\"os1\"]").val(color);
				$("[name=\"os2\"]").val(theSize.val());
				//$("[name=\"os1\"]").val($("#theSize option:selected").html());

				$("[name=\"item_selection_1\"]").val(gMatch[color][size]);				
			}