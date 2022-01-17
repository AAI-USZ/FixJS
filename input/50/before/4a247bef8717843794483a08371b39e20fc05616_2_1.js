function() {
    var tmp_tool;
    tmp_tool = window.viewModel.tool();
    window.viewModel.tool(window.viewModel.last_tool());
    return window.viewModel.last_tool(tmp_tool);
  }