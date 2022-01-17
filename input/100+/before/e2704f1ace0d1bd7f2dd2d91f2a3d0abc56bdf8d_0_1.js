function(event) {
      event.preventDefault();
      var $criterion = $(this).parents(".criterion"),
          comments = $criterion.getTemplateData({textValues: ['rating_custom']}).rating_custom,
          criterion_name = $criterion.find(".criterion_description:first").text().split(/\b\s+/)[0],
          data = {
            criterion_comments: comments,
            criterion_description: criterion_name + ' description: ' + $criterion.find(".criterion_description .long_description:first").text()
          };

      $rubric_criterion_comments_dialog.data('current_rating', $criterion);
      $rubric_criterion_comments_dialog.fillTemplateData({data: data});
      $rubric_criterion_comments_dialog.fillFormData(data);
      $rubric_criterion_comments_dialog.find(".editing").hide();
      $rubric_criterion_comments_dialog.find(".displaying").show();
      $rubric_criterion_comments_dialog.dialog('close').dialog({
        autoOpen: false,
        title: I18n.t('titles.additional_comments', "Additional Comments"),
        width: 400
      }).dialog('open');
    }