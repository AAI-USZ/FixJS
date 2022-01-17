function (uid) {
    var editor,
        eClass = "edit-row",
        editUrl = l('/unit/edit/' + uid),
        reqData = this.getReqData(),
        widget = '',
        ctxt = {before: [], after: []};

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

        if (data.ctxt) {
          PTL.editor.ctxtGap = 2;
          ctxt.before = data.ctxt.before;
          ctxt.after = data.ctxt.after;
        }
      },
      error: PTL.editor.error
    });

    eClass += this.units[uid].isfuzzy ? " fuzzy-unit" : "";
    editor = (ctxt.before.length ? '<tr class="more-context before"><td colspan="2"><a class="morecontext ptr">' + gettext("Show more context rows") + '</a></td></tr>' : '') +
             this.buildCtxtRows(ctxt.before) +
             '<tr id="row' + uid + '" class="' + eClass + '">' +
             widget + '</tr>' +
             this.buildCtxtRows(ctxt.after) +
             (ctxt.after.length ? '<tr class="more-context after"><td colspan="2"><a class="morecontext ptr">' + gettext("Show more context rows") + '</a></td></tr>' : '');

    this.activeUid = uid;

    return editor;
  }