function(){
			this.model = Y.Task;
			this.after('task:change', this._taskChangeInterceptor);
			this.publish(EVT_PARENT_CHANGE,    {defaultFn: this._defAddFn});
		}