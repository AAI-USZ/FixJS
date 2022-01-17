function GetTags() {
        $.get('/Home/GetTags',
            function(data) {
                var tagList = JSON.parse(data);

                $.each(tagList, function(i, obj) {
                    var tag = tagList[i].Tag;
                    wordList.push(tag);
                    var count = tagList[i].Count;
                    totalAmountOfTags += count;
                    relativeSizes.push(count);
                });

                $.each(relativeSizes, function(i, obj) {
                    relativeSizes[i] = 10 + 10 * relativeSizes[i] / totalAmountOfTags;
                });

                $.each(tagList, function(i, obj) {
                    var str = "<a href=\"#\" class=\"tag\" onclick=TagClicked(\"" + wordList[i] + "\")><font size=" + relativeSizes[i] + ">" + wordList[i] + "</font></a>";
                    $("#tag_holder").append(str);
                });
                $("#loading").hide();
            }
        );
    }