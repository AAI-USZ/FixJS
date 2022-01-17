function () {
            var body = $("<div></div>");
            processMessages([
                        { MessageId: "1", MessageType: "AddNewList", ListId: "InDev", Name: "In Development" },
                        { MessageId: "2", MessageType: "AddNewStory", StoryId: "55", ListId: "InDev", Name: "Create Customer", Position: "10" },
                        { MessageId: "3", MessageType: "AddNewStory", StoryId: "56", ListId: "InDev", Name: "Create Invoice", Position: "5" }
                    ], body);

            expect(body.find("ul li").length).toEqual(2);
            expect(body.find("ul")[0].innerHTML)
                .toEqual(
                    '<li data-id="56" data-position="5" class="story"><div>Create Invoice</div></li>' +
                        '<li data-id="55" data-position="10" class="story"><div>Create Customer</div></li>');
        }