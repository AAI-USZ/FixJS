function SearchComplete( searcher )
  {
	  
      // 結果オブジェクトを取得する
      var results = searcher.results;
	  
      if( results && ( 0 < results.length ) )
      {
          // 情報を取得する
          for( var i = 0; i < results.length; i++ )
          {	  
			  if(results[i] !== null){
					imgresults[no++]=[results[i].title,results[i].url,results[i].tbUrl]; 
				}
			} 
       }
	   
	var current = searcher.cursor;              // cursorオブジェクト
    var currentPage = current.currentPageIndex;  // 現在のページ番号

    if( currentPage < current.pages.length - 1 )
    {
        var nextPage = currentPage + 1;          // 次のページのページ番号

        // 次のページを検索する
        searcher.gotoPage( nextPage );
		console.log(nextPage);
    }
	
	if(currentPage == 3){
		drawing(0);
	}
  }