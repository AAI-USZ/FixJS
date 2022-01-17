function (uid) {
    var editor,
        eClass = "edit-row",
        editUrl = l('/unit/edit/' + uid),
        reqData = this.getReqData(),
        widget = '',
        ctx_cell,
        ctx = {before: [], after: []};

    $.ajax({
      url: editUrl,
      async: false,
      data: reqData,
      dataType: 'json',
      success: function (data) {
        widget = data['editor'];
        PTL.editor.updateBreadcrumbs(data['dircrumbs'], data['storecrumbs']);
        // Update pager in case it's needed
        PTL.editor.updatePager(PTL.editor.createPager(uid));

        if (data.ctx) {
          PTL.editor.ctxGap = 2;
          ctx.before = data.ctx.before;
          ctx.after = data.ctx.after;
        }
      },
      error: PTL.editor.error
    });

    eClass += this.units[uid].isfuzzy ? " fuzzy-unit" : "";
    ctx_cell = '<td colspan="2"><a class="morecontext ptr">' + gettext("Show more context rows") + '</a></td>';

    editor = (ctx.before.length ? '<tr class="more-context before">' + ctx_cell + '</tr>' : '') +
             this.buildCtxRows(ctx.before) +
             '<tr id="row' + uid + '" class="' + eClass + '">' +
             widget + '</tr>' +
             this.buildCtxRows(ctx.after) +
             (ctx.after.length ? '<tr class="more-context after">' + ctx_cell + '</tr>' : '');

    this.activeUid = uid;

    return editor;
  }