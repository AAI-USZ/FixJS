function (uid) {
    var editor,
        eClass = "edit-row js-inject-ctx",
        editUrl = l('/unit/edit/' + uid),
        reqData = this.getReqData(),
        widget = '',
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

    editor = this.buildCtxRows(ctx.before, "before") +
             '<tr id="row' + uid + '" class="' + eClass + '">' +
             widget + '</tr>' +
             this.buildCtxRows(ctx.after, "after");

    this.activeUid = uid;

    return editor;
  }