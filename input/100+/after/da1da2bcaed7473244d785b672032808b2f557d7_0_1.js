function draw(){
				var that = this;
				// raport(jstr(this.parent.graphData));
				if( $("#subgraphTree_"+pf).length === 0 ){
						$("#left_plugins_"+pf).append("<div id='subgraphTree_"+pf+"' class='plugin_"+pf+"'> </div>");
				}
				if(this.parent.graphData){
					this.data = this.convert(this.parent.graphData);
					// console.log(this.data);

					this.tree = $("#subgraphTree_"+pf)
						.jstree({
							"json_data" : {
								"data" : this.data
							},
							"ui" : {
								"select_limit" : 9
							},
							"themes" : {
								"theme" : "default",
								"dots" : true,
								"icons" : false
							},
							"plugins" : [ "themes", "json_data", "ui" ] //,  "contextmenu""crrm",
						})
						.delegate("a", "click", function (event) {
							// Poniższe dwie linijki ze względu na dziwactwo wtyczki jsTree
							that.counter += 1;
							if( that.counter % 2 == 0){
								a($("a.jstree-clicked").text().substring(1))
								//a(event)
							}

							return false;
						});
				}
			}