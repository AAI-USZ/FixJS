function() {
    window.viewModel.state("BUILD");
    $menus.fadeOut();
    load_level("test");
    return window.backwards_to($main_menu);
  }