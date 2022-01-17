function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      var tablet = true;

      // Create the pages
      var overview = new mobileshowcase.page.Overview();
      var events = new mobileshowcase.page.Event();
      var list = new mobileshowcase.page.List();
      var tab = new mobileshowcase.page.Tab();
      var toolbar = new mobileshowcase.page.Toolbar();
      var form = new mobileshowcase.page.Form();
      var animation = new mobileshowcase.page.Animation();
      var animationLanding = new mobileshowcase.page.AnimationLanding();
      var atoms = new mobileshowcase.page.Atom();
      var basic = new mobileshowcase.page.Basic();
      var dialogs = new mobileshowcase.page.Dialog();
      var dataBinding = new mobileshowcase.page.DataBinding();

      // todo: tablet support
      if (tablet) {
        var splitPane = new qx.ui.mobile.container.SplitPane();
        this.getRoot().setLayout(new qx.ui.mobile.layout.VBox());
        splitPane.setPopup(new qx.ui.mobile.dialog.Popup());
        this.getRoot().add(splitPane, {flex:1});
        splitPane.show();
        splitPane.getLeft().add(overview);
        splitPane.getRight().add(events);
        splitPane.getRight().add(list);
        splitPane.getRight().add(tab);
        splitPane.getRight().add(toolbar);
        splitPane.getRight().add(form);
        splitPane.getRight().add(animation);
        splitPane.getRight().add(animationLanding);
        splitPane.getRight().add(atoms);
        splitPane.getRight().add(basic);
        splitPane.getRight().add(dialogs);
        splitPane.getRight().add(dataBinding);
      }

      // Navigation
      var nm = qx.ui.mobile.navigation.Manager.getInstance();

      if (tablet) {
        nm.onGet("/.*", function(data) {
          overview.show();
        },this);
      }


      nm.onGet("/", function(data) {
        overview.show(data.customData);
      },this);

      nm.onGet("/event", function(data)
      {
        events.show();
      },this);

      nm.onGet("/tab", function(data)
      {
        tab.show();
      },this);

      nm.onGet("/toolbar", function(data)
      {
        toolbar.show();
      },this);

      nm.onGet("/list", function(data)
      {
        list.show();
      },this);

      nm.onGet("/form", function(data)
      {
        form.show();
      },this);

      nm.onGet("/atom", function(data)
      {
        atoms.show();
      },this);

      nm.onGet("/animation", function(data) {
        animation.show(data.customData);
      },this);

      nm.onGet("/animation/:animation", function(data) {
        var animation = data.params.animation;
        animationLanding.setAnimation(animation);
        animationLanding.show({animation:animation});
      },this);
      
      nm.onGet("/basic", function(data)
      {
        basic.show();
      },this);
      
      nm.onGet("/dialog", function(data)
      {
        dialogs.show();
      },this);
      
      nm.onGet("/databinding", function(data)
      {
        dataBinding.show();
      },this);
      
      

    }