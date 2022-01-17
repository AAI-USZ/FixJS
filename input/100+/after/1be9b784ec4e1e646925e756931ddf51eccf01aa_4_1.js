function()
    {
      this.base(arguments);

      var label = new qx.ui.mobile.form.Title("Search");
      this.getContent().add(label);

      var toolbar = this.__toolbar = new qx.ui.mobile.toolbar.ToolBar();
      this.add(toolbar); // getContent()
      var searchBtn = new qx.ui.mobile.toolbar.Button("Search");
      toolbar.add(searchBtn);
      searchBtn.addListener("tap", function(){

      var searchDialog = this.__createSearchDialog();
      searchDialog.show();
      }, this);
      toolbar.add(new qx.ui.mobile.toolbar.Separator());
      var goBackBtn = new qx.ui.mobile.toolbar.Button(null,this.__toolbarButtonImages[0]);
      toolbar.add(goBackBtn);
      goBackBtn.addListener("tap", function(){
        var popup = this.__createAreYouSurePopup(goBackBtn);
        popup.show();
      }, this);
      toolbar.add(new qx.ui.mobile.toolbar.Separator());

      var loadButton = new qx.ui.mobile.toolbar.Button("Take a new picture",this.__toolbarButtonImages[1]);
      loadButton.setIconPosition("top");
      loadButton.setGap(0);
      toolbar.add(loadButton);

      loadButton.addListener("tap", function(){
        var popup = this.__createSearchPopup();
        popup.show();
        qx.lang.Function.delay(popup.hide, 3000, popup);
      }, this);

      toolbar.add(new qx.ui.mobile.toolbar.Separator());
      var deleteButton = new qx.ui.mobile.toolbar.Button("Delete");
      toolbar.add(deleteButton);

      deleteButton.addListener("tap", function(){
        this.__deleteDialog = qx.ui.mobile.dialog.Manager.getInstance().warning('Deleting', 'Are you sure?', this.__processDelete, this, ["Yes", "No"]);
      }, this);
    }