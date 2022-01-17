function imageIt() {
        //TODO filter 'q' for useless prepositions like 'the', 'and', etc
        var selection = selectedText;
        if (selection == '') {
            alert('Select some text with which to find images.');
            return;
        }

        //images.search.yahoo.com/search/images?p=test

        var iurl = 'http://images.search.yahoo.com/search/images?p=' + escape(selection);
        
        newWindowIFrame('Image results for: ' + selection, iurl);
        
    }