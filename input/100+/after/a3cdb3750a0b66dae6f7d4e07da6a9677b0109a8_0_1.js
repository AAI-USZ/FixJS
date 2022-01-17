function () {
            var body = $("<div></div>");
            processMessages([
                    { MessageId: "1", MessageType: "AddNewList", ListId: "InDev", Name: "In Development" },
                    { MessageId: "2", MessageType: "AddNewStory", StoryId: "55", ListId: "InDev", Name: "Create Customer (Bug)", Position: "0" }
                ], body);

            expect(body.find("ul li").length).toEqual(1);
            expect(body.find("ul")[0].innerHTML)
                .toEqual('<li data-id="55" data-position="0" class="story bug"><div>Create Customer (Bug)</div></li>');
        }