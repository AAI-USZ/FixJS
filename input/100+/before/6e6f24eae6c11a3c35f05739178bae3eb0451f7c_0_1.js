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
                that.options.rows.eq(index).addClass(that.options.styles.disabled);
            }
        }