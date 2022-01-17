function (row, index) {
            var record = that.options.list[that.options.offset + index];
            if (!record) {
                return;
            }
            if (!cspace.permissions.resolve({
                permission: "read",
                target: record.recordtype || record.sourceFieldType,
                resolver: that.permissionsResolver
            })) {
                // Make links unclickable and also style them as read-only
                that.options.rows.eq(index).addClass(that.options.styles.disabled);
                that.options.rows.eq(index).find("a").attr("href", "#");
            }
        }