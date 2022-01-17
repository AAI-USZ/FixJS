function() {
		for (var td in this.tds)
			this.tds[td].children().remove();
		this.tds.boardTd.append(this.boardDiv);
		this.tds.pgnTd.append(this.pgnDiv);
		this.tds.descriptionsTd.append(this.descriptionsDiv);
	}