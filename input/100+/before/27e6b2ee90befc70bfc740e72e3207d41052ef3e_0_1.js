function convert_upce_to_upca(upc) {
	if(upc.length==7) { upc = upc+validate_upce(upc,true); }
	if(upc.length>8||upc.length<8) { return false; }
	if(!upc.match(/^0/)) { return false; }
	if(validate_upce(upc)===false) { return false; }
	if(upc.match(/0(\d{5})([0-3])(\d{1})/)) {
	upc_matches = upc.match(/0(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})/);
	if(upc_matches[6]==0) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[6]+"0000"+upc_matches[3]+upc_matches[4]+upc_matches[5]+upc_matches[7]; }
	if(upc_matches[6]==1) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[6]+"0000"+upc_matches[3]+upc_matches[4]+upc_matches[5]+upc_matches[7]; }
	if(upc_matches[6]==2) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[6]+"0000"+upc_matches[3]+upc_matches[4]+upc_matches[5]+upc_matches[7]; }
	if(upc_matches[6]==3) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[3]+"00000"+upc_matches[4]+upc_matches[5]+upc_matches[7]; } }
	if(upc.match(/0(\d{5})([4-9])(\d{1})/)) {
	upc_matches = upc.match(/0(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})/);
	if(upc_matches[6]==4) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[3]+upc_matches[4]+"00000"+upc_matches[5]+upc_matches[7]; }
	if(upc_matches[6]==5) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[3]+upc_matches[4]+upc_matches[5]+"0000"+upc_matches[6]+upc_matches[7]; }
	if(upc_matches[6]==6) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[3]+upc_matches[4]+upc_matches[5]+"0000"+upc_matches[6]+upc_matches[7]; }
	if(upc_matches[6]==7) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[3]+upc_matches[4]+upc_matches[5]+"0000"+upc_matches[6]+upc_matches[7]; }
	if(upc_matches[6]==8) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[3]+upc_matches[4]+upc_matches[5]+"0000"+upc_matches[6]+upc_matches[7]; }
	if(upc_matches[6]==9) {
	upce = "0"+upc_matches[1]+upc_matches[2]+upc_matches[3]+upc_matches[4]+upc_matches[5]+"0000"+upc_matches[6]+upc_matches[7]; } }
	return upce; }