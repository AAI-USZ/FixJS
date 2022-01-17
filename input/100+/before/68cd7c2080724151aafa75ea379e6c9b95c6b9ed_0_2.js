function($) {

	var _private = {
		base: undefined,
		selected: []
	};

	return {
		load: function(elm) {
			_private.base = elm;

			sgudjonsson.memory.addListener("game-created", function(e) {
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
			});

			sgudjonsson.memory.addListener("match-found", function(e) {
				for(var i = 0; i < e.target.indexes.length; i++) {
					$(_private.base).find(".card").eq(e.target.indexes[i]).addClass("done");
				}
			});

			sgudjonsson.memory.addListener("no-match-found", function(e) {
				for(var i = 0; i < e.target.indexes.length; i++) {
					$(_private.base).find(".card").eq(e.target.indexes[i])
						.addClass("no-match");
				}
			});

			sgudjonsson.memory.addListener("timer", function(e) {
			})

			sgudjonsson.memory.addListener("game-won", function(e) {
			})

			$(".card", _private.base).live("click", function(e) {

				var d = $(this).data();
				if(_private.selected.indexOf(d.index) == -1 && !$(this).hasClass("done")) {

					if(_private.selected.length == 2) {
						$(_private.base).find(".card").removeClass("selected");
						_private.selected = [];
					}

					$(_private.base).find(".card").removeClass("no-match");
					$(this).addClass("selected");
					var selected = sgudjonsson.memory.selectCard(d.index);

					_private.selected.push(d.index)
				}
			});
		}
	}

}