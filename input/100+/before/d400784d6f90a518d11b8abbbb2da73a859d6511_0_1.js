function(e)
{
	var editProfileWin = Titanium.UI.createWindow({
		
	});
	
	var saveProfileButton = Titanium.UI.createButton({
	title:'Save',
	height:25,
	width:'21%',
	top:0,
	right:'5%',
	borderWidth:4,
	color: '#000000'
	});
	
	saveProfileButton.addEventListener('click', function(e)
	{
		editProfileWin.close();
	});
	
	var profileManage = Titanium.UI.createLabel({
	text:'Manage Profile',
	top:'12%',
	height:'10%',
	left:'45%',
	font:{fontSize:18, fontStyle:'bold'}
	});
	
	var profilePicManage = Titanium.UI.createImageView({
	image:'http://www.appcelerator.com/wp-content/uploads/2009/06/titanium_desk.png',
	height:'30%',
	width:'35%',
	top:0,
	left:'5%',
});
	
	var aboutMeButton = Titanium.UI.createButton({
	title:'About Me',
	height:40,
	width:'45%',
	top:'32%',
	left:'5%',
	borderWidth:4,
	color: '#000000'
	});
	
	aboutMeButton.addEventListener('click', function(e)
	{
		tableviewManage.hide();
		nameLabel.show();
		nameText.show();
		locationLabel.show();
		locationText.show();
		bioLabel.show();
		bioArea.show();
	});
	
	var myReadingButton = Titanium.UI.createButton({
	title:'My Reading',
	height:40,
	width:'45%',
	top:'32%',
	right:'5%',
	borderWidth:4,
	color: '#000000'
	});
	
	myReadingButton.addEventListener('click', function(e)
	{
		nameLabel.hide();
		nameText.hide();
		locationLabel.hide();
		locationText.hide();
		bioLabel.hide();
		bioArea.hide();
		tableviewManage.show();
	});
	
	var nameLabel = Titanium.UI.createLabel({
	text:'Name:',
	top:'44%',
	left:'10%',
	font:{fontSize:16}
	});
	
	var nameText = Titanium.UI.createTextField({
		editable: true,
		value: '',
		width:'80%',
		left:'10%',
		height: 25,
		top:'49%',
		font:{fontSize:14},
		color:'#000',
		textAlign:'left',
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		borderWidth:2,
		borderColor:'#000',
		borderRadius:0,
		suppressReturn:false,
		paddingLeft: 5
	});
	
	var locationLabel = Titanium.UI.createLabel({
	text:'Location:',
	top:'56%',
	left:'10%',
	font:{fontSize:16}
	});
	
	var locationText = Titanium.UI.createTextField({
		editable: true,
		value: '',
		width:'80%',
		left:'10%',
		top:'61%',
		height: 25,
		font:{fontSize:14},
		color:'#000',
		textAlign:'left',
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		borderWidth:2,
		borderColor:'#000',
		borderRadius:0,
		suppressReturn:false,
		paddingLeft: 5
	});
	
	var bioLabel = Titanium.UI.createLabel({
	text:'Biography:',
	top:'68%',
	left:'10%',
	font:{fontSize:16}
	});
	
	var bioArea = Titanium.UI.createTextArea({
	editable: true,
	value: '',
	height:'25%',
	width:'80%',
	left:'10%',
	top:'73%',
	font:{fontSize:14},
	color:'#000',
	textAlign:'left',
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	borderWidth:2,
	borderColor:'#000',
	borderRadius:0,
	suppressReturn:false,
	paddingLeft: 5
});

bioArea.addEventListener('return', function()
{
    bioArea.blur();
});

nameText.addEventListener('return', function()
{
    nameText.blur();
});

locationText.addEventListener('return', function()
{
    locationText.blur();
});

// create table view data object
var dataManage = [
	{title:'Currently Reading', hasChild:true, height:35, selectedColor:'#fff'},
	{title:'Want to Read', hasChild:true, height: 35, selectedColor:'#fff'},
	{title:'Recently Read', hasChild:true, height: 35, selectedColor:'#fff'},
	{title:'Read a While Ago', hasChild:true, height: 35, selectedColor:'#fff'}
];

// create table view
var tableviewManage = Titanium.UI.createTableView({
	data:data,
	font:{fontSize:11},
	top:'49%',
	width: '90%',
	height: 140,
	borderWidth:1,
	borderColor: '#888'
});
	
	var winview = Ti.UI.createView({backgroundColor:'white'});
	winview.add(saveProfileButton);
	winview.add(profilePicManage);
	winview.add(profileManage);
	winview.add(aboutMeButton);
	winview.add(myReadingButton);
	winview.add(nameLabel);
	winview.add(nameText);
	winview.add(locationLabel);
	winview.add(locationText);
	winview.add(bioLabel);
	winview.add(bioArea);
	winview.add(tableviewManage);
	
	tableviewManage.hide(); //Initial state
	
	editProfileWin.add(winview);
	
	Titanium.UI.currentTab.open(editProfileWin,{animated:true});	
}