function (doc, req) {
    var form = req.form;

    // enforce tag conventions
    form.board = form.board.toLowerCase();

    if (form.board.substr(0,1) == 'm') {
        form.board = 'f' + form.board.substring(1, form.board.length);
    }

    if (!form.created || form.created == '') {
        form.created = (new Date('Thu Jul 4 1776')).toString();
    }

    doc = {
        _id: req.uuid,
        type: 'tag',
        created: form.created,
        author: form.author,
        board: form.board,
        setup: {
          mb: form.mb,
          db0: form.db0,
          db1: form.db1,
          db2: form.db2,
          db3: form.db3,
        },
        status: form.status,
        content: form.content
    };

    var content = templates.render('tag_saved.html', req, {board_id: doc.board});

    if (!(req.client)) {
      content = templates.render('base.html', req, {
        content: content,
        title: 'Tag saved'
      });
      return [doc, content];
    }

    return [doc, {content: content, title: 'Tag saved'}];
}