function(bk){
        if(bk != null){
            var Book = bk;
        }else{
            var Book = {
                title: window.prompt("Enter the book title.", "Y. M. General Conference"),
                chapter: []
            };
            var lastBook = IndexWriter.data.book.pop();
            var chapterpane, divindex;
            Book.index = lastBook !=null?(Number(lastBook.index)+ 1):0;
        
            if(lastBook !=null){
                IndexWriter.data.book.push(lastBook, Book);
            }else{
                IndexWriter.data.book.push(Book);
            }
        }
        
        
        var bookLiInner = '<a href="#'+IndexWriter.data.coursenum+'book'+Book.index+'">'+Book.title+'</a>';
        var newBook = docreate('li', '', '',bookLiInner);
        var chapterIndexPane = docreate('div', 'tab-pane span5', IndexWriter.data.coursenum+'book'+Book.index);
        var chapterIndexNav = docreate('ul', 'nav nav-list', '', '<li class="nav-header">Chapters</li>');
        var addChapterli = docreate('li', '', '', '<a href="#"><i class="icon-plus"></i><b>Add a new Lesson</b></a>');            
        this.bookeditortab.insertBefore(newBook, this.addBookButton);
        chapterIndexNav.appendChild(addChapterli);
        chapterIndexNav = chapterIndexPane.appendChild(chapterIndexNav);
        this.chaptereditortab.appendChild(chapterIndexPane);
        this.bookLiSet.push(newBook);
        divindex = IndexWriter.divs.push({
            book: newBook, 
            chapter: []
        })-1;
        IndexWriter.divs[divindex].chapter.push(chapterIndexNav);
        addChapterli.onclick = chapterAddListener;
        
        $('#bookEditorTab a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
        $(newBook).tab('show');
        function chapterAddListener(e){
            proto.addChapter({
                book: Book, 
                nav: chapterIndexNav, 
                before: this
            });
            e.preventDefault();
        }
        return {
            nav: chapterIndexNav, 
            before: addChapterli
        };
    }