function() {

        var chatBoxesPos= 0;

        for (var x in this.chatBoxes) {

            if (!this.chatBoxes[x].isClosed()) {

                this.chatBoxes[x].position(chatBoxesPos);

                chatBoxesPos++;

            }

        }

    }