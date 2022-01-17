function(response) {
            var content = response;
            if (content.startDate){
                console.log("Parsing date: " + content.startDate);
                content.startDate = new Date(content.startDate);
                console.log(content.startDate);
            }
            for (var i = 0; i < content.events.length; i++){
                content.events[i].dateCreated = new Date(content.events[i].dateCreated);
            }
            return content;
        }