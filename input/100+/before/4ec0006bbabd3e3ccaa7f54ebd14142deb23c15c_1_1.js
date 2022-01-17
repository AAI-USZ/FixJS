function() {
    my.element = $('<div/>')
      .attr('id', 'dattss-graph-' + my.idx)
      .addClass('dattss-graph');

    var title = $('<div/>').addClass('title');
    title.append($('<span/>').addClass('type pictos').html(my.type[0]));
    title.append($('<span/>').addClass('process').html(my.process.toUpperCase()));
    title.append($('<span/>').addClass('stat').html(my.stat));
    title.append($('<span/>').addClass('close pictos').html('d'));

    var cont = $('<div/>').addClass('container');

    my.element.append(title);
    my.element.append(cont);

    return my.element;
  }