function(elem) {
      //console.log('save block');
      $(elem).find('input[name="report_id"]').val(p.editor.report_id);
      p.editor.save_report('#report');
      var doc = $(elem).find("form.block-meta").serializeObject();
      doc.fields = [];
      $(elem).find("form.block-field").each(function(i) {
        doc.fields.push($(this).serializeObject());
      });
      p.tools.create_or_update_doc(doc);
    }