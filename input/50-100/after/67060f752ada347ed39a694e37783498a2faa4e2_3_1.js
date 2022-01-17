function() {
        view = new joCard([
            new joTitle("Blog Post Demo"),
            new joGroup(
                new joFlexcol([
                     new joButton('Add Post').selectEvent.subscribe(onAddPostClicked),
                     new joDivider(),
                     new joHTML("<div id='blogEntryList' />")
                ])
            )
        ]).setTitle("Blog Demo");

        App.stack.popEvent.subscribe(function(){
            App.BlogListScreen.refresh();
        });
    }