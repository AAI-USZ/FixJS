function(ksName, cfName)

    {

        this.base(arguments);

        

        var propsButton = new qx.ui.menu.Button("Properties", "qx/icon/Oxygen/16/status/dialog-information.png");

        propsButton.setUserData('KSNAME', ksName);

        propsButton.setUserData('CFNAME', cfName);

        propsButton.addListener("execute", this.__showProperties);

        this.add(propsButton);

        

        var viewDataButton = new qx.ui.menu.Button("View data", "qx/icon/Oxygen/16/apps/office-spreadsheet.png");

        viewDataButton.setUserData('KSNAME', ksName);

        viewDataButton.setUserData('CFNAME', cfName);

        this.add(viewDataButton);

        

        this.add(new qx.ui.menu.Separator());

        

        var removeButton = new qx.ui.menu.Button("Remove", "qx/icon/Oxygen/16/actions/edit-delete.png");

        removeButton.setUserData('KSNAME', ksName);

        removeButton.setUserData('CFNAME', cfName);

        removeButton.addListener("execute", this.__removeColumnFamily);

        this.add(removeButton);

        

        var truncateButton = new qx.ui.menu.Button("Truncate", "qx/icon/Oxygen/16/actions/edit-clear.png");

        truncateButton.setUserData('KSNAME', ksName);

        truncateButton.setUserData('CFNAME', cfName);

        truncateButton.addListener("execute", this.__truncateColumnFamily);

        this.add(truncateButton);

    }