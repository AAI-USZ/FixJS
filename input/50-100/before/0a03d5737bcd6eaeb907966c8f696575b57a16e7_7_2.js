function (record, index) {
            if (!cspace.permissions.resolve({
                permission: "read",
                target: record.recordtype || record.sourceFieldType,
                resolver: that.permissionsResolver
            })) {
                that.options.rows.eq(index).addClass(that.options.styles.disabled);
            }
        }