function() {
        view = new joCard([
            new joGroup([
               new joLabel("Title"),
               new joFlexrow(inputTitle = new joInput("")),
               new joLabel("Content"),
               new joFlexrow(inputContent = new joTextarea("")),
            ]),
            new joDivider(),
            new joButton("Submit").selectEvent.subscribe(onSubmitClicked),
        ]);
    }