function(ida, note){
                      var
                        $note= typeof note.node == _string_ ? $(note.node) : note.node || {},
                        $note= $note.jquery ? $note : $(tag(_div_), $note),
                        $note= $note.attr({ id: ida }).addClass(annotation_klass),
                        $image= note.image ? $(tag(_img_), note.image) : $(),
                        $link= note.link ? $(tag('a'), note.link) : $()
                      css(hash(ida), { display: _none_, position: _absolute_ }, true);
                      note.image || note.link && $note.append($link);
                      note.link || note.image && $note.append($image);
                      note.link && note.image && $note.append($link.append($image));
                      $note.appendTo($overlay);
                    }