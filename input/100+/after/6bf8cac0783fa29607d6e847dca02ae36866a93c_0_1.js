function(){
    $(this.loadbox).setStyles({
	"height":0,
	"overflow":"hidden",
	"margin-top":17
    });
    $('sub-nav').addClass('hide');
    if($(this.imageElement)){
	$(this.imageElement).destroy();
    }
    $(document.body).setStyles({
	"overflow":"auto",
	"padding-bottom":60
    });
    $(document.body).fireEvent("updatepreview");
    $(document.body).removeEvents("updatepreview");
    $(document.body).removeEvents("publishnew");
    $(this.object).addClass("editing");
    this.preview 	 = true;
    this.alreadyEdit = true;
    this.resize();
    this.showPubs.bind(this).delay(1000);
    if($(this.previewElement)){
	$(this.previewElement).spin();
    }
}