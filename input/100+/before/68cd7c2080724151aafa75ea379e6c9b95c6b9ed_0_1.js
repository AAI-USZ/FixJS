function(e) {
				$(_private.base)
					.empty()
					.addClass("memory-ui")
					.append("<div class='board'>")
					.append("<div class='actions'><ul /></div>");

				var $board = $(_private.base).find(".board");

				for(var i = 0; i < e.target.cards.length; i++) {
					$board.append("<div class='card' data-index='"+ i +"'><span>"+ e.target.cards[i].key +"</span></div>");
				}

				var $actions = $(_private.base).find(".actions ul");

				$actions.append("<li><a id='action-new-game'>New game</a></li>");

				$("#action-new-game").live("click", function() {
					sgudjonsson.memory.create(8);
				});
			}