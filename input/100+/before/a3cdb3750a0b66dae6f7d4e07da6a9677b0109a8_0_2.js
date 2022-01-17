function () {
        it("should remove story", function () {
            var body = $("<div></div>");
            processMessages([
                        { MessageId: "1", MessageType: "AddNewList", ListId: "InDev", Name: "In Development" },
                        { MessageId: "2", MessageType: "AddNewStory", StoryId: "55", ListId: "InDev", Name: "Create Customer", Position: "0" },
                        { MessageId: "3", MessageType: "AddNewStory", StoryId: "56", ListId: "InDev", Name: "Create Invoice", Position: "10" },
                        { MessageId: "4", MessageType: "AddNewStory", StoryId: "57", ListId: "InDev", Name: "Create Account", Position: "20" },
                        { MessageId: "5", MessageType: "RemoveStory", StoryId: "56" }
                    ], body);

            expect(body.find("ul li").length).toEqual(2);
            expect(body.find("ul li[data-id='55'] div")[0].innerHTML).toEqual("Create Customer");
            expect(body.find("ul li[data-id='57'] div")[0].innerHTML).toEqual("Create Account");
        });
    }