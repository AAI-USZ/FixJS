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
          // Initialize context gap to the maximum context rows available
          PTL.editor.ctxGap = Math.max(data.ctx.before.length,
                                       data.ctx.after.length);
          ctx.before = data.ctx.before;
          ctx.after = data.ctx.after;
        }
      },
      error: PTL.editor.error
    });

    eClass += this.units[uid].isfuzzy ? " fuzzy-unit" : "";
    ctx_cell = '<td colspan="2"><a class="js-more-ctx ptr">' +
      gettext("More") + '</a> / <a class="js-less-ctx ptr">' +
      gettext("Less") + '</a></td>';

    editor = (ctx.before.length ? '<tr class="edit-ctx before">' +
              ctx_cell + '</tr>' : '') +
             this.buildCtxRows(ctx.before, "before") +
             '<tr id="row' + uid + '" class="' + eClass + '">' +
             widget + '</tr>' +
             this.buildCtxRows(ctx.after, "after") +
             (ctx.after.length ? '<tr class="edit-ctx after">' +
              ctx_cell + '</tr>' : '');

    this.activeUid = uid;

    return editor;
  }