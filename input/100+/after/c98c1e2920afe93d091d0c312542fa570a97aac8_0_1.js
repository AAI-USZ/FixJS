function populateSubmissionInformation($submission, submission) {
    var $td = $submission,
        assignment = object_data["assignment_" + submission.assignment_id].assignment,
        student_name = $("#outer_student_" + submission.user_id + " .display_name").text(),
        assignment_name = $("#outer_assignment_" + submission.assignment_id + " .display_name").text(),
        title = I18n.t('submission_information', "Submission Information"),
        $grade = $td.find(".grade"),
        $score = $td.find(".score"),
        grade = $.trim($grade.text()),
        $grade_entry = $("#student_grading_" + submission.assignment_id).clone(),
        comment = submission.comment || "",
        points_possible = submission.points_possible,
        $view = $(document.createElement('div')),
        $type = $(document.createElement('div')),
        url = $("#gradebook_urls .view_online_submission_url").attr('href');
        
    if(student_name && assignment_name) {
      title = assignment_name + ": " + student_name;
    }
    if ($grade.find("img").length > 0) {
      grade = $grade.find("img").attr('alt');
    }
    if($score.length > 0) {
      grade = $score.text();
    }
    if(grade == "_" || grade == "-") { grade = ""; }
    
    if($grade_entry[0].tagName == "SELECT") {
      $grade_entry.val(submission.grade);
    } else if(grade != "") {
      $grade_entry.val(grade);
    }
    
    url = $.replaceTags(url, 'assignment_id', submission.assignment_id);
    url = $.replaceTags(url, 'user_id', submission.user_id);
    $view.append($("#submission_view_image").clone(true).removeAttr('id'));
    $view.append($(" <a href='" + url + "'>" + I18n.t('links.submission_details', "Submission Details") + "</a>"));

    $type.css({textAlign: "center", fontWeight: "bold", fontSize: "1.2em", marginTop: 5});
    if(submission.submission_type && submission.submission_type != "online_quiz") {
      if(submission.submission_type == "online_url") {
        $type.append($("#submission_" + submission.submission_type + "_image").clone().removeAttr('id'));
        var url = submission.url;
        $type.append(" <a href='" + url + "' target='_new'>" + I18n.t('links.go_to_submission', "Go To Submission URL") + "</a>");
      } else if(submission.submission_type == "online_upload") {
        var url = $("#gradebook_urls .view_online_upload_url").attr('href');
        url = $.replaceTags(url, "assignment_id", submission.assignment_id);
        url = $.replaceTags(url, "user_id", submission.user_id);
        if(submission.attachments) {
          for(var idx in submission.attachments) {
            var attachment = submission.attachments[idx].attachment;
            var attachment_url = $.replaceTags(url, "attachment_id", attachment.id);
            var turnitin = submission.turnitin_data && submission.turnitin_data['attachment_' + attachment.id];
            if(turnitin) {
              var turnitin_url = $.replaceTags($.replaceTags($.replaceTags($(".turnitin_report_url").attr('href'), 'user_id', submission.user_id), 'asset_string', 'attachment_' + attachment.id), 'assignment_id', submission.assignment_id);
              var $link = $("<a/>");
              $link.attr('href', turnitin_url).addClass('turnitin_similarity_score').addClass(((turnitin && turnitin.state) || 'no') + '_score');
              $link.attr('title', I18n.t('titles.turnitin_score', 'Turnitin similarity score -- more information'));
              $link.attr('target', '_blank');
              $link.text((turnitin.similarity_score || '--') + "%");
              $type.append($link);
            }
            $type.append($("#submission_" + submission.submission_type + "_image").clone().removeAttr('id'));
            $type.append(" <a href='" + attachment_url + "'>" + htmlEscape(I18n.t('links.download_attachment', "Download %{attachment}", {'attachment': attachment.display_name})) + "</a><br/>");
          }
        }
      } else if(submission.submission_type == "online_text_entry") {
        var turnitin = submission.turnitin_data && submission.turnitin_data['submission_' + submission.id];
        if(turnitin) {
          var turnitin_url = $.replaceTags($.replaceTags($.replaceTags($(".turnitin_report_url").attr('href'), 'user_id', submission.user_id), 'asset_string', 'submission_' + submission.id), 'assignment_id', submission.assignment_id);
          var $link = $("<a/>");
          $link.attr('href', turnitin_url).addClass('turnitin_similarity_score').addClass(((turnitin && turnitin.state) || 'no') + '_score');
          $link.attr('title', I18n.t('titles.turnitin_score', 'Turnitin similarity score -- more information'));
          $link.attr('target', '_blank');
          $link.text(turnitin.similarity_score + "%");
          $type.append($link);
        }
        $type.append($("#submission_" + submission.submission_type + "_image").clone().removeAttr('id'));
        var url = $("#gradebook_urls .view_online_text_entry_url").attr('href');
        url = $.replaceTags(url, "assignment_id", submission.assignment_id);
        url = $.replaceTags(url, "user_id", submission.user_id);
        $type.append(" <a href='" + url + "' target='_new' class='view_submission_link'>" + I18n.t('links.view_submission', "View Submission") + "</a>");
      }
    } else if(submission.quiz_submission) {
      var url = $("#gradebook_urls .view_quiz_url").attr('href');
      url = $.replaceTags(url, "quiz_id", submission.quiz_submission.quiz_id);
      url = $.replaceTags(url, "user_id", submission.user_id);
      if(submission.workflow_state == "pending_review") {
        $type.append($("#submission_pending_review_image").clone().removeAttr('id'));
        $type.append(" <a href='" + url + "' target='_new'>" + I18n.t('links.finish_scoring', "Finish Scoring this Quiz") + "</a>");
      } else {
        $type.append($("#submission_quiz_image").clone().removeAttr('id'));
        $type.append(" <a href='" + url + "' target='_new'>" + I18n.t('links.view_quiz', "View this Quiz") + "</a>");
      }
    }

    $submission_information
      .find(".no_comments").hide().end()
      .find(".add_comment_link").hide().end()
      .find(".points_possible").text(points_possible || "").end()
      .find(".out_of").showIf(points_possible || points_possible === '0').end()
      .find(".grade_entry").empty().append($grade_entry.show()).end()
      .find("textarea.comment_text").show().val("").end()
      .find(".submission_details").empty().append($view).append($type).show().end()
      .find(".submission_comments").empty().end()
      .find(".comment_attachments").empty().end()
      .find(".save_buttons,.add_comment").showIf(!readOnlyGradebook).end()
      .find(".group_comment").showIf(assignment && assignment.group_category).find(":checkbox").attr('checked', false).end().end();

    if(readOnlyGradebook) {
      $submission_information.find(".grade_entry").text(grade || "-");
    }
    
    submission.student_id = submission.user_id;
    submission.id = submission.id || "";
    var late = assignment.due_at && submission.submitted_at && Date.parse(assignment.due_at) < Date.parse(submission.submitted_at);
    $submission_information.find(".submitted_at_box").showIf(submission.submitted_at).toggleClass('late_submission', !!late);
    submission.submitted_at_string = $.parseFromISO(submission.submitted_at).datetime_formatted;
    $submission_information.fillTemplateData({
      data: submission,
      except: ['created_at', 'submission_comments', 'submission_comment', 'comment', 'attachments', 'attachment']
    });
    for(var idx in submission.submission_comments) {
      var comment = submission.submission_comments[idx].submission_comment;
      var $comment = $("#submission_comment_blank").clone(true).removeAttr('id');
      comment.posted_at = $.parseFromISO(comment.created_at).datetime_formatted;
      $comment.fillTemplateData({
        data: comment,
        except: ['attachments']
      });
      if(comment.attachments) {
        for(var jdx in comment.attachments) {
          var attachment = comment.attachments[jdx].attachment;
          var $attachment = $('#submission_comment_attachment_blank').clone().removeAttr('id').show();
          attachment.assignment_id = submission.assignment_id;
          attachment.user_id = submission.user_id;
          attachment.comment_id = comment.id;
          $attachment.fillTemplateData({
            data: attachment,
            hrefValues: ['assignment_id', 'user_id', 'id', 'comment_id']
          });
          $comment.find(".attachments").append($attachment);
        }
      }
      $submission_information.find(".submission_comments").append($comment.show());
    }
    $submission_information.show().dialog('close').dialog({
      width: 500,
      height: "auto",
      title: title, 
      open: function() {
        $submission_information.find(".grading_value").focus().select();
        $("#gradebook").data('disable_highlight', true);
      }, close: function() {
        $("#gradebook").data('disable_highlight', false);
      },
      autoOpen: false
    }).dialog('open').dialog('option', 'title', title);
  }