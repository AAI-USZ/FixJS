function (element, value, info, metaData)
            {
                if (info.isComment) {
                    metaData.template = info.commentTemplate;
                }
                else {
                    metaData.template = $(element).html();
                    $(element).empty();
                }
            }