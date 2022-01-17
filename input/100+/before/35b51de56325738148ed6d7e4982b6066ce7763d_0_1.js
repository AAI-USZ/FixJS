function(e) {
			if (e.success) {
				alert("Total Result is " +  e.posts.length);
				loadingIndicator.show();
				var resultLength =  e.posts.length
				for (var i = 0; i <= resultLength; i+=3) {
		
					var homeTableRow = Ti.UI.createTableViewRow({
				    	height : '100dp',
				    });
				      
				    for(var r = 0; r < 3; r++){
				    	
				    	var currentPointer = i+r;
				    	
				    	if(resultLength - currentPointer < 1){
				    		break;
				    	}
				    	var post = e.posts[currentPointer];
				    	//alert('id: ' + post.id + ' ' + 'id: ' + post.id + ' ' + 'title: ' + post.title + ' ' + 'content: ' + post.content + ' ' + 'updated_at: ' + post.updated_at);
				    	//allSellingResult[i] = post;
				    	
				    	var columnView = Ti.UI.createView({
				    		backgroundImage :post.photo.urls.square_75,
					    	top : othersTableSetting.imageTop,
					        left : tableLeftSetting[r],
					        width : othersTableSetting.imageLength,
					        height : othersTableSetting.imageLength,
					        pointer : currentPointer.toString(),
					        postID : post.id
					    });
					    var moduleOverlay = Ti.UI.createView({
							backgroundColor : 'Black',
							left : tableLeftSetting[r],
							bottom : '0dp',
							height : '20dp',
							width : othersTableSetting.imageLength,
							opacity : 0.50
						});
						moduleOverlay.add(Ti.UI.createLabel({
							text : post.custom_fields.moduleCode,
							textAlign : 'center',
							color : '#FFFFFF',
							font : {
								fontSize : '15dp',
								fontWeight : 'bold'
							}
						}));
						var priceOverlay = Ti.UI.createView({
							backgroundImage: 'images/priceOverlay.png',
							top :othersTableSetting.imageTop,
							left : priceOverlayleft[r],
							width : othersTableSetting.priceOverlayLength,
							height : othersTableSetting.priceOverlayLength,
						});
						priceOverlay.add(Ti.UI.createLabel({
							text : post.custom_fields.price,
							color : '#FFFFFF',
							font : {
								fontSize : '14.5dp',
								fontWeight : 'bold'
							},
							transform : labelRotation,
						}));
						homeTableRow.add(columnView);
						homeTableRow.add(moduleOverlay);
						homeTableRow.add(priceOverlay);
				    };
				    //rowData.push(homeTableRow);
				    rowData[i/3] = homeTableRow;
				};	
				var homeTableView = Ti.UI.createTableView({
					data : rowData,
					separatorColor : 'transparent'
				});
		
				displayFacultyBookWin.add(homeTableView); 
				loadingIndicator.hide();
				
				homeTableView.addEventListener('click', function(e){
					if(e.source.postID){
						//alert ('You had click on ' + e.source.pointer );
						loadingIndicator.show();
						var sellingViewDetailsWin = Ti.UI.createWindow({
							url: 'sellingViewDetails.js',
							backgroundColor: '#FFFFFF',
							modal: true, 
							exitOnClose: true
						});
						sellingViewDetailsWin.postID = e.source.postID;
						loadingIndicator.hide();
						sellingViewDetailsWin.open();
					};
				});
			} else {
				loadingIndicator.hide();
				alert('Error in query: ' + ((e.error && e.message) || JSON.stringify(e)));
			}
		}