function (itemId, callback) {
            _s3qlQuery("<S3QL>"
                + "<select>*</select>"
                + "<from>items</from>"
                + "<where>"
                + "<item_id>" + itemId + "</item_id>"
                + "</where>"
                + "</S3QL>",
                callback
            );
        }