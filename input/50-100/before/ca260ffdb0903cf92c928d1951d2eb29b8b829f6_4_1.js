function() {
        view = new joGroup(
            new joFlexcol([
                new joHTML("<div id='blogEntryContainer' />"),
                new joDivider(),
                new joHTML("<h4>Comments</h4>"),
                new joHTML("<div id='commentList' />"),
                new joButton("Add comment").selectEvent.subscribe(onAddComClicked)
            ])
        ).setTitle("Blog Post")
    }