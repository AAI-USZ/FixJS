function(){
		var $bookShelf = $("section");
		var $bookShelfClone = $bookShelf.clone();
		
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
		});//*/
	}