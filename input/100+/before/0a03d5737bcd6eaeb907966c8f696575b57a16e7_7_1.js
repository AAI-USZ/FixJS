function (row, rows) {
            var index = rows.index(row),
                record = that.model.list[index];
            if (!cspace.permissions.resolve({
                permission: "read",
                target: record.recordtype || record.sourceFieldType,
                resolver: that.permissionsResolver
            })) {
                return;
            }
            row.addClass(that.options.styles.selected);
            that.applier.requestChange("selectonIndex", index);
            that.events.onSelect.fire();
        }