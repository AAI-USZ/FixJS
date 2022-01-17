function() {
    var markup = this.requisition.getInputStatusMarkup(this.input.cursor.start);
    markup.forEach(function(member) {
      member.string = member.string.replace(/ /g, '\u00a0'); // i.e. &nbsp;
      member.className = 'gcli-in-' + member.status.toString().toLowerCase();
    }, this);
    return markup;
  }