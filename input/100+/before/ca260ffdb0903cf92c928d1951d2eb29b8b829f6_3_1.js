function() {
        view = new joCard([
            new joTitle("Blog Post Demo"),
            new joGroup(
                new joFlexcol([
                     new joButton('Add Post')
                            .selectEvent.subscribe(onAddPostClicked),
                     new joDivider(),
                     new joHTML("<div id='blogEntryList' />")
                ])
            )
        ]).setTitle("Blog Demo");

        // Register event listener to refresh the screen when the data changes
        $(document).on('BlogEntryService:change', function(e){
            if ($('#blogEntryList').length == 0) {
                return;
            }

            console.log("change!");
            App.BlogListScreen.refresh();
        });
    }