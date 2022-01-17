function update_board(board, paused, target, number, hint, ended, found_puzzle_taus, old_found_puzzle_tau_index) {
    game_paused = paused;
    console.log("This board has " + number + " taus");

    var processed_hint = []
    if (hint !== null) {
      for (var card_index in hint) {
        processed_hint.push(get_card_number(hint[card_index]));
      }
    }

    var playing_area = $("#playing_area");
    old_selected = selection_model['selected'];
    selection_model['selected'] = [];
    playing_area.html('');

    if (paused) {
      var unpause_link = $("<a id=\"unpause\" tabindex=\"1\" href=\"javascript:void(0);\">Unpause</a>");
      unpause_link.click(function() {
        pause("unpause");
      });
      playing_area.append(unpause_link);
      return;
    }

    var table = $('<table style="display:block; float:left;">');
    var max_row = 3;
    var max_col = board.length / max_row;
    card_index_to_div_map = {};
    card_index_to_card_map = {};
    var this_board = [];
    for (var row_index = 0; row_index < max_row; row_index++) {
      var row = $('<tr>');
      if (row_index === max_row - 1) {
        row.addClass("bottomRow");
      }
      for (var col_index = 0; col_index < max_col; col_index++) {
        var card_index = row_index + col_index * max_row;
        var card = board[card_index];
        var col = $('<td>');
        if (card === null) {
          var div = $('<div class="fakeCard">');
          col.append(div);
        } else {
          var div = $('<div class="realCard unselectedCard" data-card-index="' + card_index + '" data-card="' + card + '">');
          div.addClass(getImgClass());
          card_index_to_div_map[card_index] = div;
          card_index_to_card_map[card_index] = card;

          if (processed_hint.indexOf(get_card_number(card)) != -1) {
            div.addClass("hint");
          }

          prev_index = card_to_board_map[get_card_number(card)];
          if (prev_board.length > 0 && (prev_index === undefined || prev_index != card_index)) {
            div.css("background-color", "#FF8");
            div.animate({backgroundColor: "#FF8"}, 200)
               .animate({backgroundColor: "#FFF"}, 1000);
          }
          card_to_board_map[get_card_number(card)] = card_index;
          this_board.push(get_card_number(card));

          div.click(function(e) {
            select_card(parseInt($(this).attr("data-card-index")));
            return false;
          });

          var card_number = get_card_number(card);
          var offset = card_number * 80;

          div.css("background-position", "-" + offset + "px 0");
          col.append(div);
        }
        
        row.append(col);
        col.disableTextSelect();
      }
      if (target != null) {
        var col = $('<td>');
        var div = $('<div class="fakeCard">');
        col.append(div);
        row.append(col);
        if (row_index === 0 || row_index === 2) {
          row.append(col);
        } else {
          var card_div = $('<div class="realCard unselectedCard">');
          card_div.addClass(getImgClass());
          var card_number = get_card_number(target);
          var offset = card_number * 80;

          card_div.css("background-position", "-" + offset + "px 0");
          var col = $('<td>');
          col.append(card_div);
          row.append(col);
        }
      }
      table.append(row);
    }
    playing_area.append(table);
    if (found_puzzle_taus != null) {
      var found_puzzle_taus_div = $("<div id=\"found_puzzle_taus\" style=\"float:left;\">");
      for (var i in found_puzzle_taus) {
        var tau_div = $('<div class="found_puzzle_tau">');
        for (var j in found_puzzle_taus[i]) {
          card = found_puzzle_taus[i][j];
          var card_number = get_card_number(card);
          var offset = card_number * 40;
          var card_div = $('<div class="smallCard smallRegularTau">');
          card_div.css("background-position", "-" + offset + "px 0");
          tau_div.append(card_div);
          if (last_found_puzzle_taus !== null && i >= last_found_puzzle_taus.length) {
            card_div.css("background-color", "#FF8");
            card_div.animate({backgroundColor: "#FF8"}, 200)
                .animate({backgroundColor: "#FFF"}, 1000);
          }
        }
        found_puzzle_taus_div.append(tau_div);
      }
      playing_area.append(found_puzzle_taus_div);
      playing_area.append($('<div style="clear:both;">'));
      last_found_puzzle_taus = found_puzzle_taus;
    }
    prev_board = this_board;
  }