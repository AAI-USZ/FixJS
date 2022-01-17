function() {
    this.fieldset = $('<fieldset class="multiple_file_uploads"></fieldset>');
    var file_upload = $('<div class="file_upload"></div>');
    this.first_input = $('<input id="edition_edition_attachments_attributes_0_attachment_attributes_file" name="edition[edition_attachments_attributes][0][attachment_attributes][file]" type="file" />');

    file_upload.append('<label for="edition_edition_attachments_attributes_0_attachment_attributes_title">Title</label>');
    file_upload.append('<input id="edition_edition_attachments_attributes_0_attachment_attributes_title" name="edition[edition_attachments_attributes][0][attachment_attributes][title]" size="30" type="text" />');
    file_upload.append('<label for="edition_edition_attachments_attributes_0_attachment_attributes_caption">Caption</label>');
    file_upload.append('<textarea id="edition_edition_attachments_attributes_0_attachment_attributes_caption" name="edition[edition_attachments_attributes][0][attachment_attributes][caption]"></textarea>');
    file_upload.append('<label for="edition_edition_attachments_attributes_0_attachment_attributes_file">File</label>');
    file_upload.append(this.first_input);
    file_upload.append('<input id="edition_edition_attachments_attributes_0_attachment_attributes_file_cache" name="edition[edition_attachments_attributes][0][attachment_attributes][file_cache]" type="hidden" />');

    this.fieldset.append(file_upload);
    $('#qunit-fixture').append(this.fieldset);
    this.fieldset.enableMultipleFileUploads();
  }