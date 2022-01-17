function(){

			var left;

			$(".selection").removeClass("selected");

			if(checkSelection() == "LC"){

				$("#lcFull").addClass("selected");

				left = $("#lcFull").position().left + (($("#lcFull").width() - 140)/2 + 10);

				$("#selectorImg").animate({"left":left},100);

				_selPos = $("#lcFull");

			}

			else if(checkSelection() == "NT"){

				$("#ntFull").addClass("selected");

				left = $("#ntFull").position().left + (($("#ntFull").width() - 140)/2 + 10);

				$("#selectorImg").animate({"left":left},100);

				_selPos = $("#ntFull");

			}

			else if(checkSelection() == "VU"){

				$("#vuFull").addClass("selected");

				left = $("#vuFull").position().left + (($("#vuFull").width() - 140)/2 + 10);

				$("#selectorImg").animate({"left":left},100);

				_selPos = $("#vuFull");

			}

			else if(checkSelection() == "EN"){

				$("#enFull").addClass("selected");

				left = $("#enFull").position().left + (($("#enFull").width() - 140)/2) + 10;

				$("#selectorImg").animate({"left":left},100);

				_selPos = $("#enFull");

			}

			else{

				$("#crFull").addClass("selected");

				left = $("#crFull").position().left + (($("#crFull").width() - 140)/2 + 10);

				$("#selectorImg").animate({"left":left},100);

				_selPos = $("#crFull");

			}

			sortGraphics();

		}