function(query){this.query=query;},setAutoSave:function(state){this.autoSave=state;return this;},setData:function(data){var last=this.data;this.data=data;if(data!==last)
this.changeEvent.fire(data);},getData:function(){return this.data;},getDataCount:function(){return this.getData().length;}