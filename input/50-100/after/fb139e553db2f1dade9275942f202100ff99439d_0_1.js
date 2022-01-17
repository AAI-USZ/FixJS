function (data) {
        widget = data['editor'];
        PTL.editor.updateBreadcrumbs(data['dircrumbs'], data['storecrumbs']);
        // Update pager in case it's needed
        PTL.editor.updatePager(PTL.editor.createPager(uid));

        if (data.ctx) {
          PTL.editor.ctxGap += PTL.editor.ctxStep;
          ctx.before = data.ctx.before;
          ctx.after = data.ctx.after;
        }
      }