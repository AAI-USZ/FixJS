function() {
            var array = [];
             dojo.forEach(this.listItems,
                   dojo.hitch(this,function(item) {
                   array.push(item.answer.answerId);
                   }));
            console.debug("getAnswers", array);
            return array;
        }