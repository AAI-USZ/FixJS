function(e) {
		if (e.success) {
			var user = e.users[0];
			//alert('Success:\\n' + 'id: ' + user.id + '\\n' + 'first name: ' + user.first_name + '\\n' + 'last name: ' + user.last_name);
			Cloud.Posts.query({
				page : 1,
				per_page : 20,
				where : {
					"userId" : Ti.App.Properties.getString('email')  // *** NEED TO CHANGE THIS AFTER SETTING UP DETAILS OF USER! ***
				},
				order : "-created_at"
			}, function(e) {
				if (e.success) {
					//alert('Success:\\n' + 'Count: ' + e.posts.length);
					// *** CHECK IF THERE IS ANY DATA FOR THE USER IF NOT RETURN NO DATA ***
					for (var i = 0; i < e.posts.length; i++) {
						var post = e.posts[i];
						mySellingData[i] = post;
						//alert('id: ' + post.id + '\\n' + 'id: ' + post.id + '\\n' + 'title: ' + post.title + '\\n' + 'content: ' + post.content + '\\n' + 'updated_at: ' + post.updated_at);

						var mySellingItemRow = Ti.UI.createTableViewRow({
							height: '100dp',
						});

						var bookImage = Titanium.UI.createImageView({
							image : post.photo.urls.square_75 ,
							width : '80dp',
							height : '80dp',
							left : '10dp',
							top : '10dp'
						});

						var bookTitle = Titanium.UI.createLabel({
							text : post.custom_fields.bookTitle,
							font : {
								fontSize : '15dp',
								fontWeight : 'bold'
							},
							color: '#000014',
							width : 'auto',
							textAlign : 'left',
							left : '100dp',
						});
						Ti.API.info('The book title is : ' + bookTitle.text);

						var mySellingListRowNumber = Ti.UI.createLabel({
							text : i,
						});
						
						mySellingItemRow.add(bookImage);
						mySellingItemRow.add(bookTitle);
						mySellingItemRow.hasChild = true;

						//mySellingItemRow.className = 'My Selling List';
						resultData[i] = mySellingItemRow;
						//resultData.push(mySellingItemRow);
						//mySellingListTable.appendRow(mySellingItemRow);
					};
					Ti.API.info('No of data : ' + resultData.length);

					//mySellingListTable.data = resultData;
					//mySellingListTable.setData = data
					var mySellingListTable = Titanium.UI.createTableView({
						data: resultData,
						color : '#000014',
					});
					mySellingListWin.add(mySellingListTable);
					loadingIndicator.hide();
					currentTab.open(mySellingListWin);
					//mySellingListWin.open();
					
					mySellingListTable.addEventListener('click', function(e){
						
						var sellingListDetailwin = Ti.UI.createWindow({
							url: 'mySellingListDetail.js',
							backgroundColor: '#FFFFFF',
							modal: true, 
							exitOnClose: true
						});
						sellingListDetailwin.sellingDetails = mySellingData[e.index];
						//sellingListDetailwin.mySellingListRowNumber = e.index;
						//mySellingListWin.open(sellingListDetailwin);
						sellingListDetailwin.open({animated:true,});
					})
					
				} else {
					loadingIndicator.hide();
					alert('Error in query:\\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
			});
		} else {
			loadingIndicator.hide();
			alert('Error in login:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	}