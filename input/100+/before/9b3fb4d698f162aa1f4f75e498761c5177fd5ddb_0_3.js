function () {
                   var conv = new Conversation({
                      From: $(this).attr("From"),
                      ConvID: $(this).attr("ConvID"),
                      TimeReceived: $(this).attr("TimeReceived"),
                      Text: $(this).attr("Text"),
                      Read: $(this).attr("Read"),
                      To: $(this).attr('To'),
                      Starred:$(this).attr('Starred')
                   });
                   self.addConversationBasicEffect(conv, false);
                }