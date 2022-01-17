function(args){
        var isNew = true, dataLoaded=false;
        args.lesson = {
            book: args.book.index
        };
        if(args.chapter == null){
            args.chapter = {
                title: prompt("Enter the lesson Title:", ""),
                author: prompt("Enter the Author's Name:", ""),
                index: args.book.chapter.length + 1
            };
            args.lesson.index= args.chapter.index;
            LessonWriter.data.chapter.push(args.lesson);
            args.book.chapter.push(args.chapter);
        }
        
        args.lesson.index= args.chapter.index;
        
        var id = 'book'+args.book.index+'ch'+args.chapter.index;
        var text = args.chapter.index+") "+args.chapter.author + " - "+args.chapter.title;
        var anchor = docreate('a', '', '', text);
        anchor.setAttribute('href','#');
        var newChapterLi = docreate('li', 'indexEditChapter',id);
        var toolBar = docreate('span', 'pull-right editChapterNav');
        var ncEdit = docreate('i', 'icon-pencil editButton');
        ncEdit.setAttribute('title', 'Add or Edit Text');
        var ncEditClips = docreate('i', 'icon-tag editButton');
        ncEditClips.setAttribute('title', 'Edit Audio Clips');
        var ncAddAudio = docreate('i', 'icon-headphones editButton');
        ncAddAudio.setAttribute('title', 'Add Audio Track');
        var ncRemoveSelf = docreate('i', 'icon-remove editButton');
        ncRemoveSelf.setAttribute('title', 'Delete Chapter');
        toolBar.appendChild(ncEdit);
        toolBar.appendChild(ncAddAudio);
        toolBar.appendChild(ncEditClips);
        toolBar.appendChild(ncRemoveSelf);
        anchor.appendChild(toolBar);
        newChapterLi.appendChild(anchor);
        args.nav.insertBefore(newChapterLi, args.before);
        anchor.onclick = function(e){
            e.preventDefault();
        }
        ncEdit.onclick      = editTextListener;
        ncEditClips.onclick = editClipsListener;
        ncAddAudio.onclick  = addTrackListener;
        ncRemoveSelf.onclick = addRemoveListener;
        
        function addRemoveListener(e){
            args.book.chapter.splice(args.chapter);
            ncEdit.onclick      = null;
            ncEditClips.onclick = null;
            ncAddAudio.onclick  = null;
            ncRemoveSelf.onclick = null;
            args.nav.removeChild(newChapterLi);
        }
        function editTextListener(e){
            if(!dataLoaded){
                LessonWriter.load({
                    url: urldata.lessonget,
                    data: 'course='+IndexWriter.data.coursenum+'&book='+args.book.index+'&chapter='+args.lesson.index
                });
                dataLoaded=true;
            }
            proto.editChapterText({
                madeNew: isNew,
                chapter: args.lesson,
                book: args.book
            });
            e.preventDefault();
        }
        function editClipsListener(e){
            if(!dataLoaded){
                LessonWriter.load({
                    url: urldata.lessonget,
                    data: 'course='+IndexWriter.data.coursenum+'&book='+args.book.index+'&chapter='+args.lesson.index
                });
                dataLoaded=true;
            }
            
            proto.editChapterClips({
                madeNew: isNew,
                chapter: args.lesson,
                book: args.book
            });
            e.preventDefault();
        }
        function addTrackListener(e){
            if(!dataLoaded){
                LessonWriter.load({
                    url: urldata.lessonget,
                    data: 'course='+IndexWriter.data.coursenum+'&book='+args.book.index+'&chapter='+args.lesson.index
                });
                dataLoaded=true;
            }
            proto.addChapterAudioTrack({
                madeNew: isNew,
                chapter: args.lesson,
                book: args.book
            });
            e.preventDefault();
        }
    }