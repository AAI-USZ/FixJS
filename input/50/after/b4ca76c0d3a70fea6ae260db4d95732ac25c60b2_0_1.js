function(json){
	var weapons = [];
	for (var key in json.weapons){
		//var weapon = json.weapons[key];
		//console.log(" weapon : " + key + ", name : " + weapon.name + ", range : " + weapon.range);
		 weapons.push(key);
	};
	return weapons;
}