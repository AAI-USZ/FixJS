function () {
        if (Ext.isEmpty(this.values)) {
            this.values = {};
        }
        this.title = this.values.label === null ? '[no title]' : this.values.label;

        if (this.remote) {
            this.cls += ' remote';
        }

        var countryField, regionField;
        if (this.iso) {
            countryField = {
                xtype: 'combobox',
                store: 'Admin.store.account.CountryStore',
                fieldLabel: 'Country',
                valueField: 'code',
                displayField: 'englishName',
                queryMode: 'local',
                minChars: 1,
                emptyText: 'Please select',
                name: 'isoCountry',
                itemId: 'isoCountry',
                value: this.values.isoCountry,
                width: 400,
                disabled: this.readonly
            };

            regionField = new Ext.form.field.ComboBox({
                xtype: 'combobox',
                store: 'Admin.store.account.RegionStore',
                valueField: 'code',
                displayField: 'englishName',
                queryMode: 'local',
                minChars: 1,
                emptyText: 'Please select',
                fieldLabel: 'Region',
                name: 'isoRegion',
                itemId: 'isoRegion',
                width: 400,
                value: this.values.isoRegion,
                disabled: this.values.isoRegion === null
            });
        } else {
            countryField = {
                xtype: 'textfield',
                fieldLabel: 'Country',
                name: 'country',
                itemId: 'address-country',
                value: this.values.country,
                width: 400,
                disabled: this.readonly
            };
            regionField = {
                xtype: 'textfield',
                fieldLabel: 'Region',
                name: 'region',
                itemId: 'address-region',
                width: 400,
                value: this.values.region,
                disabled: this.readonly
            };
        }
        this.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Label',
                name: 'label',
                itemId: 'address-label',
                enableKeyEvents: true,
                value: this.values.label,
                bubbleEvents: ['keyup'],
                disabled: this.readonly
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Street',
                name: 'street',
                itemId: 'address-street',
                value: this.values.street,
                disabled: this.readonly
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Postal Code',
                name: 'postalCode',
                itemId: 'address-postal-code',
                value: this.values.postalCode,
                disabled: this.readonly
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Postal Address',
                name: 'postalAddress',
                itemId: 'address-postal-address',
                value: this.values.postalAddress,
                disabled: this.readonly
            },
            countryField,
            regionField,
            {
                xtype: 'hiddenfield',
                name: 'originalIndex',
                value: this.values.originalIndex
            }
        ];
        this.listeners = {
            beforeclose: {
                fn: function (panel, opts) {
                    panel.setDisabled(true);
                }
            }
        };
        this.callParent(arguments);
    }