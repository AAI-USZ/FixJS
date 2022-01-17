function (element, value, info, metaData)
            {
                metaData.template = $(element).html();
                $(element).empty();
            }