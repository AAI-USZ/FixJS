function(content) {
                
                var myClone = content.clone();
                myClone.find('time').remove();
                
                var data = {
                    Content: myClone.find('.result-content').html(),
                    Type: 'normal',
                    Author: this.author,
                };
                return data;
            }