function (sync) {
				sync    = (sync === true);
				var obj = this.parentNode;

				if (!sync) {
					obj.fire("beforeDataClear");
					this.callback    = null;
					this.collections = [];
					this.credentials = null;
					this.expires     = null;
					this._expires    = null;
					this.headers     = {Accept: "application/json"};
					this.key         = null;
					this.keys        = {};
					this.loaded      = false;
					this.records     = [];
					this.source      = null;
					this.total       = 0;
					this.views       = {};
					this.uri         = null;
					this._uri        = null;
					obj.fire("afterDataClear");
				}
				else {
					this.collections = [];
					this.keys        = {};
					this.loaded      = false;
					this.records     = [];
					this.total       = 0;
					this.views       = {};
				}
				return this;
			}