function (module,method){

			if (this.constructor != API){

				return new API(module,method);

			}

			

			this.module = module;

			this.method = method;

			

			this.toURL = function(){

				var ret = this.module+'/'+this.method;

				ret = '/api/'+ret;

				return ret;

			};

			this.timeout = 4000;

			this.Request = function(args,cache){

				args = args || {};

				cache = false;

				

				var 

					url = this.toURL(),

					data = {cache:cache,data:args,timeout:this.timeout},

					a = APICall(this,args);

				

				//dataType:'jsonp',crossDomain:true,

				

				data.success = function(a){

					return function(response){

						if(typeof response.error != 'undefined'){

							a.api._onError(response.error,false,a);

						}else if(typeof response.response != 'undefined'){

							a.api._onComplete(response.response,a);

						}else{

							a.api._onError('Invalid response container',false,a);

						}

					}

				}(a);

				

				

				data.error = function(a){

					return function(j,error){

						a.api._onError(error,true,a);

					}

				}(a);

				

				$.ajax(url,data);

				return this;

			};

			this._onComplete = this._onError = function(){};

			this.onComplete = function(f){

				if(typeof f == 'function'){

					this._onComplete = f;

				}

				return this;

			}

			this.onError = function(f){

				this._onError = f;

				return this;

			}

			

			return true;

		}