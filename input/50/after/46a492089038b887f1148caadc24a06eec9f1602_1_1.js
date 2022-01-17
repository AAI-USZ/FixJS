function() {
    this.fieldset = $('\
      <fieldset id="attachment_fields" class="multiple_file_uploads">\
        <div class="file_upload">\
          <label for="edition_edition_attachments_attributes_0_attachment_attributes_title">Title</label>\
          <input id="edition_edition_attachments_attributes_0_attachment_attributes_title"\ name="edition[edition_attachments_attributes][0][attachment_attributes][title]" size="30" type="text" value="something" />\
          <div class="field_with_errors">\
            <label for="edition_edition_attachments_attributes_0_attachment_attributes_file">File</label>\
          </div>\
          <div class="field_with_errors">\
            <input id="edition_edition_attachments_attributes_0_attachment_attributes_file"\ name="edition[edition_attachments_attributes][0][attachment_attributes][file]" type="file" />\
          </div>\
          <input id="edition_edition_attachments_attributes_0_attachment_attributes_file_cache"\ name="edition[edition_attachments_attributes][0][attachment_attributes][file_cache]" type="hidden" />\
        </div>\
      </fieldset>\
    ');
    $('#qunit-fixture').append(this.fieldset);
    this.fieldset.enableMultipleFileUploads();
  }