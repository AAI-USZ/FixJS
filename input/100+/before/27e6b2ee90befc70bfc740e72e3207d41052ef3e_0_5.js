function convert_upca_to_upce(upc) {
	if(upc.length==11) { upc = upc+validate_upca(upc,true); }
	if(upc.length>12||upc.length<12) { return false; }
	if(validate_upca(upc)===false) { return false; }
	if(!upc.match(/0(\d{11})/, upc)) { return false; }
	upce = null;
	if(upc.match(/0(\d{2})00000(\d{3})(\d{1})/)) {
	upc_matches = upc.match(/0(\d{2})00000(\d{3})(\d{1})/);
	upce = "0"+upc_matches[1]+upc_matches[2]+"0";
	upce = upce+upc_matches[3]; return upce; }
	if(upc.match(/0(\d{2})10000(\d{3})(\d{1})/)) {
	upc_matches = upc.match(/0(\d{2})10000(\d{3})(\d{1})/);
	upce = "0"+upc_matches[1]+upc_matches[2]+"1";
	upce = upce+upc_matches[3]; return upce; }
	if(upc.match(/0(\d{2})20000(\d{3})(\d{1})/)) {
	upc_matches = upc.match(/0(\d{2})20000(\d{3})(\d{1})/);
	upce = "0"+upc_matches[1]+upc_matches[2]+"2";
	upce = upce+upc_matches[3]; return upce; }
	if(upc.match(/0(\d{3})00000(\d{2})(\d{1})/)) {
	upc_matches = upc.match(/0(\d{3})00000(\d{2})(\d{1})/);
	upce = "0"+upc_matches[1]+upc_matches[2]+"3";
	upce = upce+upc_matches[3]; return upce; }
	if(upc.match(/0(\d{4})00000(\d{1})(\d{1})/)) {
	upc_matches = upc.match(/0(\d{4})00000(\d{1})(\d{1})/);
	upce = "0"+upc_matches[1]+upc_matches[2]+"4";
	upce = upce+upc_matches[3]; return upce; }
	if(upc.match(/0(\d{5})00005(\d{1})/)) {
	upc_matches = upc.match(/0(\d{5})00005(\d{1})/);
	upce = "0"+upc_matches[1]+"5";
	upce = upce+upc_matches[2]; return upce; }
	if(upc.match(/0(\d{5})00006(\d{1})/)) {
	upc_matches = upc.match(/0(\d{5})00006(\d{1})/);
	upce = "0"+upc_matches[1]+"6";
	upce = upce+upc_matches[2]; return upce; }
	if(upc.match(/0(\d{5})00007(\d{1})/)) {
	upc_matches = upc.match(/0(\d{5})00007(\d{1})/);
	upce = "0"+upc_matches[1]+"7";
	upce = upce+upc_matches[2]; return upce; }
	if(upc.match(/0(\d{5})00008(\d{1})/)) {
	upc_matches = upc.match(/0(\d{5})00008(\d{1})/);
	upce = "0"+upc_matches[1]+"8";
	upce = upce+upc_matches[2]; return upce; }
	if(upc.match(/0(\d{5})00009(\d{1})/)) {
	upc_matches = upc.match(/0(\d{5})00009(\d{1})/);
	upce = "0"+upc_matches[1]+"9";
	upce = upce+upc_matches[2]; return upce; }
	if(upce==null) { return false; }
	return upce; }