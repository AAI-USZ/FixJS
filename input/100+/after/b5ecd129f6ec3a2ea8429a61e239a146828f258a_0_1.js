function (el) {
  var $selects = $(el).find('select[data-add-item-url]');
  $selects.each(function () {
    var $this = $(this);
        $button = $("<a href='" + $this.attr("data-add-item-url") + "' " +
                    "data-add-to-field='" + $this.attr("id") + "' " +
                    "class='btn ajax-add ajax-modal'>+</a>");
    $this.after($button);
  });
}