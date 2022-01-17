function(e) {
			if (e.success) {
				var user = e.users[0];
				//alert('Success Login:\\n' + 'id: ' + user.id + '\\n' + 'first name: ' + user.first_name + '\\n' + 'last name: ' + user.last_name);
				/*
				Cloud.Photos.create({
					photo : sellingDetailsWin.originalImage
				}, function(e) {
					if (e.success) {
						var photo = e.photos[0];
						alert('Success:\\n' + 'id: ' + photo.id + '\\n' + 'filename: ' + photo.filename + '\\n' + 'size: ' + photo.size, 'updated_at: ' + photo.updated_at);
					} else {
						alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				});
				*/
				Cloud.Posts.create({
					title : Ti.App.Properties.getString('name') + ' Selling ' + moduleCodeField.value + ' Book!',
					content : 'Selling ' + moduleCodeField.value + ' Book via ShootNSell',
					photo : sellingDetailsWin.originalImage,
					custom_fields : '{ "userId": "' + Ti.App.Properties.getString('email') + '","bookTitle": "' + titleField.value + '", "bookSubtitle": "' + subtitleField.value + '","author": "' + authorsField.value + '", "publisher": "' + publisherField.value + '","publishedDate": "' + publishedDateField.value + '","edition": "' + editionField.value + '", "condition": "' + conditionField.value + '","faculty": "' + facultyPicker.getSelectedRow(0).title + '","moduleCode": "' + moduleCodeField.value + '", "price": "' + priceField.value + '", "bookStatus": "onSales"}',

				}, function(e) {
					if (e.success) {
						var post = e.posts[0];
						activityIndicator.hide();
						var homeWin = Ti.UI.createWindow({
							url: "home.js",
						});
						homeWin.open();
						//alert('Success create post:\\n' + 'id: ' + post.id + '\\n' + 'title: ' + post.title + '\\n' + 'content: ' + post.content + '\\n');
					} else {
						alert('Error in post creating:\\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				});

			} else {
				alert('Error in Login :\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		}