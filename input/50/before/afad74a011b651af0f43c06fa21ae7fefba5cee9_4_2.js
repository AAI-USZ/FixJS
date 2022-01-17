function(){
    	this.collection.fetch({ data:{page: this.page}});
    	this.page = this.page + 1;
    }