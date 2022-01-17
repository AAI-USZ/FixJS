function renderIssueItem(data)
{
    document.itemCounter++;

    var buttons = "<div class='control-group'>"+
			"<div class='controls'>"+
				"<div class='btn-group'>"+
					"<button class='btn' id='item-"+document.itemCounter+"' title='Move this item up' alt='Move this item up' onclick='moveItemUp('item-"+document.itemCounter+"')><i class='icon-arrow-up'></i></button>"+
					"<button class='btn' id='item-"+document.itemCounter+"' title='Move this item down' alt='Move this item down' onclick='moveDownItem('item-"+document.itemCounter+"')><i class='icon-arrow-down'></i></button>"+
					"<button class='btn' id='item-"+document.itemCounter+"' title='Delete this item' alt='Delete this item' onclick='deleteItem('item-"+document.itemCounter+"')><i class='icon-trash'></i></button>"+
				"</div>"+
			"</div>"+
		"</div>";

    var url = "<div class='control-group'>"+
			"<label class='control-label'>URL:</label>"+
			"<div class='controls'>"+
				"<input type='text' name='item-url' value='"+data.url+"'/>"+
			"</div>"+
		"</div>";

    var title = "<div class='control-group'>"+
			"<label class='control-label'>Title:</label>"+
			"<div class='controls'>"+
				"<input type='text' name='item-title' value='"+data.title+"'/>"+
			"</div>"+
		"</div>";

    var desc = "<div class='control-group'>"+
			"<label class='control-label'>Description:</label>"+
			"<div class='controls'>"+
				"<textarea name='item-description'>"+data.description + "</textarea>"+
			"</div>"+
		"</div>";

    var image = "<div class='control-group'>"+
			"<label class='control-label'>Image URL:</label>"+
			"<div class='controls'>"+
				"<div class='input-append'>"+
					"<input type='text' id='img-url-"+document.itemCounter+"'  name='item-img' value='" + data.img + "'/><input type='button' class='btn' value='Update Image' onclick='changeImg(\"img-"+document.itemCounter+"\", \"img-url-"+document.itemCounter+"\")' />"+
				"</div>"+
			"</div>"+
		"</div>";

    var preview = "<div class='control-group'>"+
			"<label class='control-label'>Image Preview:</label>"+
			"<div class='controls'>"+
    				"<img id='img-"+document.itemCounter+"' src='"+data.img+"' alt='URL does not resolve to image.' /><br />" +
			"</div>"+
		"</div>";

    var hidden = "<input type='hidden' name='item-ordernumber' value='"+document.itemCounter+"' />";

    return "<div class='well'>" + buttons + url + title + desc + image + preview + hidden + "</div>";
}