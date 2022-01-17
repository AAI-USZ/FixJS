function(e) {
	activityIndicator.show();
	Cloud.Posts.update({
	    post_id: mySellingData.id,
	    title : Ti.App.Properties.getString('name') + ' Selling ' + moduleCodeField.value + ' Book!',
		content : 'Selling ' + moduleCodeField.value + ' Book via ShootNSell',
		//photo : sellingDetailsWin.originalImage,
		custom_fields : '{ "userId": "' + Ti.App.Properties.getString('email') + '","bookTitle": "' + titleField.value + '", "bookSubtitle": "' + subtitleField.value + '","author": "' + authorsField.value + '", "publisher": "' + publisherField.value + '","publishedDate": "' + publishedDateField.value + '","edition": "' + editionField.value + '", "condition": "' + conditionField.value + '","faculty": "' + facultyPicker.getSelectedRow(0).title + '","moduleCode": "' + moduleCodeField.value + '", "price": "' + priceField.value + '", "isDeleted": false , "bookStatus": "onSales"}',

	}, function (e) {
	    if (e.success) {
	        var post = e.posts[0];
	        
	        alert('Successfully updated at:\\n' + post.updated_at);
			
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	    activityIndicator.hide();
	});
}