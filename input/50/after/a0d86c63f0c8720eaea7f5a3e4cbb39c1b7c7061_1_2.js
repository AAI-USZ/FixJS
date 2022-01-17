function() {
    window.viewModel.state("BUILD");
    $menus.fadeOut();
    load_level(window.viewModel.level());
    return window.backwards_to($main_menu);
  }