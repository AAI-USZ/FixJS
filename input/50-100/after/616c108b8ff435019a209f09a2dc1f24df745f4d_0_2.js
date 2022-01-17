function toggleShowHide(id) {
  with($(id)) {
    if (hasClassName('open')) {
      collapseProjectTree(id);
      removeClassName('open');
      addClassName('collapsed');
    } else {
      expandProjectTree(id);
      removeClassName('collapsed');
      addClassName('open');
    }
  }

  toggleOddEven();
}