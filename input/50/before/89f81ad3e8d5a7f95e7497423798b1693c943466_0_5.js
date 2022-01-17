function () {
        var search = doc.find();

        // this will perform a real search for all <link> element
        search.elem('link').toValue();

        // find second link element
        search.only().attr('href', 'file_2.css'); // no throw

        return search;
    }