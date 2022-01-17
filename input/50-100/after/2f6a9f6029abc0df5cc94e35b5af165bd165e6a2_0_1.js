function(ind){
            story = d['stories'][ind];
            var line = '<li>Uploader: '+story.uploader;
            line += 'Description: '+story.description;
            $.each(story['file_data'],function(ind){
                file = story['file_data'][ind];
                if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
                    line += '<img class="story_image" src="/image/'+file._id+'?thumb=1" />'
                }
            });
            line += '</li>'
            markup += line;
        }