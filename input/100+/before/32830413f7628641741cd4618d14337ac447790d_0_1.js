function (table) {
		// en même temps qu'on analyse la table, on ajoute les cases à cocher
		// de sélection des trolls pour l'envoi de MP.
		table = table.get(0);
		if ("undefined" == typeof table) {
			return;
		}
		var lines = table.children[0].children
		grid.nbTrollsInView = lines.length - 1;
		for (var lineIndex = 1; lineIndex < lines.length; lineIndex++) {
			var item = new Troll();
			var line = lines[lineIndex];
			var cells = line.children;
			var i = 1;
			item.id = parseInt(cells[i++].textContent);
			var nameCell = cells[i++];
			item.name = nameCell.textContent;
			$(nameCell.children[0]).attr('id', item.id + "_troll");
			item.level = cells[i++].textContent;
			item.race = cells[i++].textContent;
			item.guilde = cells[i++].textContent;
			item.x = parseInt(cells[i++].textContent);
			item.y = parseInt(cells[i++].textContent);
			item.z = parseInt(cells[i++].textContent);
			var selectBox = $('<td/>', { align: 'center'}).append($('<input/>', {type: 'checkbox', name: 'cb_troll', value: item.id}));
			$(line).prepend(selectBox);
			grid.getCellNotNull(item.x, item.y).addTroll(item);
		}

		var actionCell = $('<td/>', { colspan: 11, height: 25});
		var actions = $('<tr/>', { class: 'mh_tdtitre'}).append(actionCell);
		var sendMessage = $('<a/>', {class: 'gogo', cat: 3}).text("Envoyer un message");
		sendMessage.click(chrall.redirectToMailbox);
		actionCell.append(sendMessage);
		if (chrall.player().sessionActive) {
			var sharePx = $('<a/>', {class: 'gogo', cat: 8}).text("Partager des PX");
			sharePx.click(chrall.redirectToMailbox);
			actionCell.append(sharePx);
		}

		$(lines[0]).prepend($('<td/>')); // une cellule vide pour décaler la mise en page
		$(table.children[0]).prepend(actions);
	}