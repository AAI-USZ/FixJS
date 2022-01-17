function(response) {
            var content = response;
            if (content.startDate){
                console.log("Parsing date: " + content.startDate);
                content.startDate = new Date(content.startDate);
                console.log(content.startDate);
            }
            return content;
        }