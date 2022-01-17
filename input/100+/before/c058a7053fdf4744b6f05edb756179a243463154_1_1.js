function move_to_new_folder () {
    $ct_menu.hide();
    var new_folder = prompt('new folder name');
    if(!new_folder) { return; }
    var find = false;
    $('>li', $subs_list).each(function (idx, li) {
      var name = $.trim($('.folder span', li).text());
      if(name === new_folder) {
        find = true;
        $('.rss-category', li).prepend($last_menu_ui);
      }
    });
    if(!find) {
      var subid = $last_menu_ui.attr('data-id'),
          sub = data.get_subscription(subid);
      var html = tmpls.subs_nav({
        groups: [{subs: [sub], group: new_folder}]
      });
      $last_menu_ui.remove();
      $subs_list.append(html).find('img').each(util.favicon_error);
      $subs_list.trigger('refresh.rm');
    }
    dump_and_saving_sorting();
  }