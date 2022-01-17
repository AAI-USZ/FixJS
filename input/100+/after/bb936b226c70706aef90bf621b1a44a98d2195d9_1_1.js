function(I18n, $) {

  window.submissionAttachmentIndex = -1;

  $(document).ready(function() {
    var submitting = false,
        submissionForm = $('.submit_assignment_form');

    // grow and shrink the comments box on focus/blur if the user
    // hasn't entered any content.
    submissionForm.delegate('#submission_comment', 'focus', function(e) {
      var box = $(this);
      if (box.val().trim() === '') { box.css('height', '72px'); }
    }).delegate('#submission_comment', 'blur', function(e) {
      var box = $(this);
      if (box.val().trim() === '') { box.css('height', '16px'); }
    });

    submissionForm.submit(function(event) {
      var $turnitin = $(this).find(".turnitin_pledge");
      if($turnitin.length > 0 && !$turnitin.attr('checked')) {
        alert(I18n.t('messages.agree_to_pledge', "You must agree to the submission pledge before you can submit this assignment."));
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      var valid = !$(this).is('#submit_online_text_entry_form') || $(this).validateForm({
        object_name: 'submission',
        required: ['body']
      });
      if (!valid) return false;

      $(this).find("button[type='submit']").text(I18n.t('messages.submitting', "Submitting..."));
      $(this).find("button").attr('disabled', true);
      if($(this).attr('id') == 'submit_online_upload_form') {
        event.preventDefault() && event.stopPropagation();
        var fileElements = $(this).find('input[type=file]:visible').filter(function() {
          return $(this).val() !== '';
        });
        var uploadedAttachmentIds = $(this).find('#submission_attachment_ids').val();
        // warn user if they haven't uploaded any files
        if (fileElements.length === 0 && uploadedAttachmentIds === '') {
          $.flashError(I18n.t('#errors.no_attached_file', 'You must attach at least one file to this assignment'));
          $(this).find('button[type=submit]')
            .text(I18n.t('#button.submit_assignment', 'Submit Assignment'))
            .prop('disabled', false);
          return false;
        }
        $.ajaxJSONPreparedFiles.call(this, {
          handle_files: function(attachments, data) {
            var ids = (data['submission[attachment_ids]'] || "").split(",");
            for(var idx in attachments) {
              ids.push(attachments[idx].attachment.id);
            }
            data['submission[attachment_ids]'] = ids.join(",");
            return data;
          },
          context_code: $("#submit_assignment").data('context_code'),
          asset_string: $("#submit_assignment").data('asset_string'),
          intent: "submit",
          file_elements: fileElements,
          formData: $(this).getFormData(),
          formDataTarget: 'url',
          url: $(this).attr('action'),
          success: function(data) {
            submitting = true;
            window.location = window.location.href.replace(window.location.hash, "");
          },
          error: function(data) {
            $(this).find("button[type='submit']").text(I18n.t('messages.submit_failed', "Submit Failed, please try again"));
            $(this).find("button").attr('disabled', false);
          }
        });
      } else {
        submitting = true;
      }
    });
    window.onbeforeunload = function() {
      if($("#submit_assignment:visible").length > 0 && !submitting) {
        return I18n.t('messages.not_submitted_yet', "You haven't finished submitting your assignment.  You still need to click \"Submit\" to finish turning it in.  Do you want to leave this page anyway?");
      }
    };
    $(document).fragmentChange(function(event, hash) {
      if(hash && hash.indexOf("#submit") == 0) {
        $(".submit_assignment_link").triggerHandler('click', true);
        if(hash == "#submit_google_doc") {
          $("#submit_assignment_tabs").tabs('select', "#submit_google_doc_form");
        }
      }
    });
    $(".submit_assignment_link").click(function(event, skipConfirmation) {
      event.preventDefault();
      var late = $(this).hasClass('late');
      var now = new Date();
      if(late && !skipConfirmation) {
        var result;
        if($(".resubmit_link").length > 0) {
          result = confirm(I18n.t('messages.now_overdue', "This assignment is now overdue.  Any new submissions will be marked as late.  Continue anyway?"));
        } else {
          result = confirm(I18n.t('messages.overdue', "This assignment is overdue.  Do you still want to submit it?"));
        }
        if(!result) { return; }
      }
      hideFullAssignmentForm();
      $("#submit_assignment").show();
      $(".submit_assignment_link").hide();
      $("html,body").scrollTo($("#submit_assignment"));
      $("#submit_online_text_entry_form textarea:first").editorBox();
    });
    $("#switch_text_entry_submission_views").click(function(event) {
      event.preventDefault();
      $("#submit_online_text_entry_form textarea:first").editorBox('toggle');
    });
    $(".submit_assignment_form .cancel_button").click(function() {
      $("#submit_assignment").hide();
      $(".submit_assignment_link").show();
    });
    $("#submit_assignment_tabs").tabs();
    $("#uploaded_files > ul").instTree({
      autoclose: false,
      multi: true,
      dragdrop: false,
      onClick: function(e, node) {
        $("#submission_attachment_ids").val("");
        var ids = []; //submission_attachment_ids

        $("#uploaded_files .file.active-leaf").each(function() {
          var id = $(this).getTemplateData({textValues: ['id']}).id;
          ids.push(id);
        });
        $("#submission_attachment_ids").val(ids.join(","));
      }
    });
    $(".toggle_uploaded_files_link").click(function(event) {
      event.preventDefault();
      $("#uploaded_files").slideToggle();
    });
    $(".add_another_file_link").click(function(event) {
      event.preventDefault();
      $('#submission_attachment_blank').clone(true).removeAttr('id').show().insertBefore(this)
        .find("input").attr('name', 'attachments[' + (++submissionAttachmentIndex) + '][uploaded_data]');
      toggleRemoveAttachmentLinks();
    }).click();
    $(".remove_attachment_link").click(function(event) {
      event.preventDefault();
      $(this).parents(".submission_attachment").remove();
      checkAllowUploadSubmit();
      toggleRemoveAttachmentLinks();
    });
    function toggleRemoveAttachmentLinks(){
      $('#submit_online_upload_form .remove_attachment_link').showIf($('#submit_online_upload_form .submission_attachment:not(#submission_attachment_blank)').length > 1);
    }
    function checkAllowUploadSubmit() {
      // disable the submit button if any extensions are bad
      $('#submit_online_upload_form button[type=submit]').attr('disabled', !!$(".bad_ext_msg:visible").length);
    }
    $(".submission_attachment input[type=file]").live('change', function() {
      if (ENV.SUBMIT_ASSIGNMENT.ALLOWED_EXTENSIONS.length < 1 || $(this).val() == "")
        return;
      var ext = $(this).val().split('.').pop().toLowerCase();
      $(this).parent().find('.bad_ext_msg').showIf($.inArray(ext, ENV.SUBMIT_ASSIGNMENT.ALLOWED_EXTENSIONS) < 0);
      checkAllowUploadSubmit();
    });
  });

  $(document).ready(function() {
    $("#google_docs_tree").instTree({
      autoclose: false,
      multi: false,
      dragdrop: false
    });
    $("#google_docs_tree li.file").click(function(event) {
      if($(event.target).closest(".popout").length > 0) { return; }
      event.preventDefault();
      event.stopPropagation();
      $("#google_docs_tree li.file.active").removeClass('active');
      $(this).addClass('active');
      $("#submit_google_doc_form").find("input[name='google_doc[document_id]']").val($(this).attr('id').substring(9));
    });
    $("#google_docs_tree li.folder").click(function(event) {
      if($(event.target).closest('.sign').length == 0 && $(event.target).closest('.file,.folder').hasClass('folder')) {
        $(this).find(".sign").click();
      }
    });
  });
  $("#submit_google_doc_form").submit(function() {
    $("#uploading_google_doc_message").dialog('close').dialog({
      autoOpen: false,
      title: I18n.t('titles.uploading', "Uploading Submission"),
      modal: true,
      overlay: {
        backgroundColor: "#000",
        opacity: 0.7
      }
    }).dialog('open');
  });

  $(document).ready(function() {
    $("#submit_media_recording_form .submit_button").attr('disabled', true).text(I18n.t('messages.record_before_submitting', "Record Before Submitting"));
    $("#media_media_recording_submission_holder .record_media_comment_link").click(function(event) {
      event.preventDefault();
      $("#media_media_recording_submission").mediaComment('create', 'any', function(id, type) {
        $("#submit_media_recording_form .submit_button").attr('disabled', false).text(I18n.t('buttons.submit_assignment', "Submit Assignment"));
        $("#submit_media_recording_form .media_comment_id").val(id);
        $("#submit_media_recording_form .media_comment_type").val(type);
        $("#media_media_recording_submission_holder").children().hide();
        $("#media_media_recording_ready").show();
        $("#media_media_recording_thumbnail").attr('id', 'media_comment_' + id);
      });
    });
  });
}