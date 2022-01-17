function(){
			$.ajax({
				url: "//pages/pages.json",
				type: "GET",
				success: this.proxy(function(data){
					this.element.html(this.view("pageslist", data));
				}),
				error: function(e){
					alert("error");
				}
			});
		}