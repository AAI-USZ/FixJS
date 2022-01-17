function(ksName)

    {

        this.base(arguments);

        

        var propsButton = new qx.ui.menu.Button("Properties", "qx/icon/Oxygen/16/status/dialog-information.png");

        propsButton.setUserData('KSNAME', ksName);

        propsButton.addListener("execute", this.__showProperties);

        this.add(propsButton);

        

        this.add(new qx.ui.menu.Separator());

        

        var addCFButton = new qx.ui.menu.Button("Add column family", "qx/icon/Oxygen/16/actions/list-add.png");

        addCFButton.setUserData('KSNAME', ksName);

        addCFButton.addListener("execute", this.__addColumnFamily);

        this.add(addCFButton);

        

        var dropButton = new qx.ui.menu.Button("Drop", "qx/icon/Oxygen/16/actions/edit-delete.png");

        dropButton.setUserData('KSNAME', ksName);

        dropButton.addListener("execute", this.__dropKeyspace);

        this.add(dropButton);

    }