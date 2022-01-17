function(){
	var $bookShelf = $("section");
	var $books = $bookShelf.find("article");
	var $bookShelfClone = $bookShelf.clone();

	$(".sort a").click(function(){
		var $this=$(this);
		var sortby=$this.attr("sortby")

		$this.siblings().removeClass("selected");
		$this.addClass("selected");

		$orderedBookShelf=$bookShelfClone.find("article").sorted({
			by: function(v) {
				return $(v).data(sortby);
			}
		});

		$bookShelf.quicksand($orderedBookShelf, {
			duration: 800,
			easing: 'linear'
		},function(){
			$(".search input").keyup();
		});
	});

	$(".search input").keyup(function(){
		$books = $("section article");
		var keyword = $(this).val();
		$books.each(function(i,t){
			var matchAuthor = (""+$(t).data("author")+"").match(keyword);
			var matchTitle = (""+$(t).data("title")+"").match(keyword);

			if (matchAuthor || matchTitle)
				$(t).show(500);
			else
				$(t).hide(500);
		});
	});
	$(".search a.clear").click(function(){
		$(".search input").val("");
		$(".search a.find").click();
	});
}