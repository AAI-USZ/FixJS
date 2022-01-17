function(anchor)
    {
      if(this.__areYouSurePopup) {
        return this.__areYouSurePopup;
      }
      var popupWidget = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox());
      popupWidget.add(new qx.ui.mobile.basic.Label("Are you sure?"));
      
      var buttonsWidget = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.HBox());
      
      var okButton = new qx.ui.mobile.form.Button("Yes");
      var cancelButton = new qx.ui.mobile.form.Button("No");
      
      var descriptionLabel = new qx.ui.mobile.basic.Label("a really big dialog, with a lot of text in it. a really big dialog, with a lot of text in it.  a really big dialog, with a lot of text in it.  a really big dialog, with a lot of text in it.  a really big dialog, a really big dialog, with a lot of text in it. a really big dialog, a really big dialog, with a lot of text in it. a really big dialog, <br> with a lot of text in it. a really big dialog, with a lot of text in it.  <br> with a lot of text in it. a really big dialog, with a lot of text in it.  <br> with a lot of text in it. a really big dialog, with a lot of text in it. <br> a really big dialog, with a lot of text in it. a really big dialog, <br><br> with a lot of text in it. a really big dialog, with a lot of text in it.  <br> with a lot of text in it. a really big dialog, with a lot of text in it.  <br> with a lot of text in it. a really big dialog, with a lot of text in it. <br> a really big dialog, with a lot of text in it. a really big dialog, <br> ");
      
      buttonsWidget.add(okButton, {flex:1});
      buttonsWidget.add(cancelButton, {flex:1});
      
      popupWidget.add(descriptionLabel);
      popupWidget.add(buttonsWidget);
      
      okButton.addListener("tap", function(){
        this.__areYouSurePopup.hide();
      }, this);
      
      cancelButton.addListener("tap", function(){
        this.__areYouSurePopup.hide();
      }, this);
      
      this.__areYouSurePopup = new qx.ui.mobile.dialog.Popup(popupWidget);
      return this.__areYouSurePopup;
    }