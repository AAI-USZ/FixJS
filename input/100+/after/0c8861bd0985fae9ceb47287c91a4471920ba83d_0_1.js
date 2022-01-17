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

        

        var dropButton = new qx.ui.menu.Button("Drop", "qx/icon/Oxygen/16/actions/edit-delete.png");

        dropButton.setUserData('KSNAME', ksName);

        dropButton.setUserData('CFNAME', cfName);

        dropButton.addListener("execute", this.__dropColumnFamily);

        this.add(dropButton);

        

        var truncateButton = new qx.ui.menu.Button("Truncate", "qx/icon/Oxygen/16/actions/edit-clear.png");

        truncateButton.setUserData('KSNAME', ksName);

        truncateButton.setUserData('CFNAME', cfName);

        truncateButton.addListener("execute", this.__truncateColumnFamily);

        this.add(truncateButton);

    }