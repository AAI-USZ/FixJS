function () {
      $(this).val($('.active', $(this)).attr('value'));
      var targetIdx = $("option:selected", $(this)).attr('value');
      var $target = $(this).parents('.tabbable').eq(0).find('.tab-content [data-idx=' + targetIdx + ']');
      enableFields($target, targetIdx);
    }