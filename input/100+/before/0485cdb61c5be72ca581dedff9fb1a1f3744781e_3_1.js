function (newOne, oldOne, changedOnly) {

        if (newOne === null) {
            return;
        }

        var comparison = {
            "expanded": true,
            "children": [
                {
                    label: "1. Profile",
                    fieldsetType: "profile",
                    expanded: true,
                    leaf: false
                },
                {
                    label: "2. User",
                    fieldsetType: "user",
                    expanded: true,
                    leaf: false
                },
                {
                    label: "3. Places",
                    fieldsetType: "places",
                    expanded: true,
                    leaf: false
                },
                {
                    label: "4. Memberships",
                    fieldsetType: "memberships",
                    expanded: true,
                    leaf: false
                }
            ]
        };
        var props = [];

        var userstores = Ext.data.StoreManager.lookup('Admin.store.account.UserstoreConfigStore');
        if (userstores) {
            // compare based on userstore config, assuming both users are from the same store if present
            var userstoreName = (newOne.userStore && (!oldOne || oldOne.userStore === newOne.userStore)) ? newOne.userStore
                : this.defaultUserStore;
            var userstore = userstores.findRecord('name', userstoreName);
            if (userstore && userstore.raw.userFields) {
                this.usingUserstoreConfig = true;
                props = props.concat(userstore.raw.userFields);
                // add static properties
                var staticProps = this.getUserStaticProperties();
                if (staticProps) {
                    props = props.concat(staticProps);
                }
            }
        }

        if (props.length === 0) {
            // fall back to comparing objects properties
            props = props.concat(this.collectUniqueProperties(newOne, oldOne, true));
        }

        if (props.length > 0) {
            comparison.children = this.compareProperties('user', comparison.children, props, newOne, oldOne, changedOnly);
        }

        // filter empty fieldsets
        comparison.children = this.filterEmptyNodes(comparison.children);

        return comparison;
    }