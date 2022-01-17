function Manifest(path, name, argObj) {
	/*this.parent = null
	if (parPath != null)
		this.parent = new Manifest(parPath);*/
	this.projectName = name;
	this.path = path;
	this.obj = argObj;
	var data = null;
	this.ordernum = 0;
	this.tmpOrder = new Array();
	
	
	
	this.versionData = null;
	if (this.obj != null) {
		data = this.obj.attachments;
		this.type = "quiz";
	}
	if (data == null) {
		var f = new FileCache(path + air.File.separator + 'manifest');
		data = f.val ? JSON.parse(f.val) : [];
		this.file = f;
		var vFile = new FileCache(path + air.File.separator + 'version');
		this.versionData = vFile.val ? JSON.parse(vFile.val) : {"version":"0", "status":"Unpublished"};
	} 
	//this.tbl = $('\
	var tableString = '\
		<table id="contentTable">                \
			<thead>                              \
				<tr>                             \
				    <th class="order">Order</th> \
					<th>Type</th>                \
					<th class="big">Title</th>   ';
				if (this.obj == null)
					tableString += '<th class="big">Status</th>';
				tableString += '<th>Remove</th>              \
				</tr>                            \
			</thead>                             \
			<tbody class="proj">                 \
			</tbody>                             \
		</table>';
	this.tbl = $(tableString);
	this.confirm = $('\
		<div id="dialog-confirm" style="display: none" title="Delete Content"> \
			<p>This content will be permanently deleted and cannot be          \
			recovered. Are you sure?</p>                                       \
		</div>');
	this.edit = $(
		'<div id="dialog-content" style="display: none" title="Edit Content"></div>');
		
	for(var i in data) {
		if (this.obj == null) {
			var content = Content.FromMetadata(path, data[i]);			
			if (content.status == "Modified" || content.status == "Unpublished"){				
				this.updateStatus(false);
			}
			this.addContent(content);
		} else {
			this.addContent(data[i]);
		}
	}
	if (data.length == 0) {
		this.tbl.show();
		var tr = $('<tr id="fillRow"/>');
		this.tbl.find('tbody').append(tr);
		tr.append($('<td colspan="5" class="fill">Click "'+$("#addButton").html()+'" to start editing.</td>'));
	}
}