function(doc, req) {
  var board_id = "";
  var d = new Date();
  if (req.query.board){
    board_id = req.query.board;
    board_id = board_id.toString().substring(1, board_id.length-1);
  }
    return {
        title: 'New Tag',
        content: templates.render('tag_new.html', req, {board_id: board_id, created: d.toString()})
    };
}