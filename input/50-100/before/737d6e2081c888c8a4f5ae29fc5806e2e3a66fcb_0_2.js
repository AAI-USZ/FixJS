function () {
    selectGeographyControl.unselectAll();
    selectGeographyControl.deactivate();
    pu_layer.styleMap.styles.default.defaultStyle.display = "none";
    pu_layer.redraw();
    self.showScenarioFormPanel(false);
    self.showScenarioList(true);
    self.formSaveError(false);
  }