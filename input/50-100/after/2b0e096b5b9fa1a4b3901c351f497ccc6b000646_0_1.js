function (row, index) {
            var record = that.options.list[that.options.offset + index];
            if (!record) {return;}
            that.locate("column", rows.eq(index)).wrapInner($("<a/>").attr("href", fluid.stringTemplate(that.options.url, {
                recordType: record[that.options.typePath].toLowerCase(),
                csid: record.csid
            })));
        }