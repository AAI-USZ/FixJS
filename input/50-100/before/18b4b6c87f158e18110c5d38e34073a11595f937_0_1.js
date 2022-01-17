function OnLoad()
  {
  
      var searchControl = new google.search.SearchControl();
	  
      var imageSearch = new google.search.ImageSearch();
	  
	  searchControl.addSearcher(imageSearch);
	  
	  var drawOptions = new google.search.DrawOptions();
      drawOptions.setSearchFormRoot(document.getElementById("search"));
      searchControl.draw(document.getElementById("search_control"), drawOptions);
	
      // 検索完了時に呼び出されるコールバック関数を登録する　　　　　　　　この部分が検索結果？↓　　
      imageSearch.setSearchCompleteCallback( this, SearchComplete, [ imageSearch ] );
	  
      // 検索を実行する
      imageSearch.execute( 'sky' );
	  
  }