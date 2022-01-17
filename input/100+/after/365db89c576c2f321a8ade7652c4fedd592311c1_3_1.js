function() {
        this._mask('Loading current settings', 'page-load-mask');
        this.periodapplicationkeyvalue_store = Ext.create('Ext.data.Store', {
            model: 'devilry.apps.administrator.simplified.SimplifiedPeriodApplicationKeyValue',
            remoteFilter: true,
            remoteSort: true
        });
        this.periodapplicationkeyvalue_store.proxy.setDevilryFilters([{
            field: 'period',
            comp: 'exact',
            value: this.loader.periodid
        }, {
            field: 'application',
            comp: 'exact',
            value: this.applicationid
        //}, {
            //field: 'key',
            //comp: 'exact',
            //value: 'settings'
        }]);
        this.periodapplicationkeyvalue_store.proxy.setDevilryOrderby(['-key']);
        this.periodapplicationkeyvalue_store.pageSize = 2; // settings and ready-for-export
        this.periodapplicationkeyvalue_store.load({
            scope: this,
            callback: this._onLoadSettings
        });
    }