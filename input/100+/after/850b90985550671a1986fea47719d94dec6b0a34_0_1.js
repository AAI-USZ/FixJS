function () {
	$('#ratio_label').sfLabel({text: 'Ratio:'});
	$('#total_up_label').sfLabel({text:'up:'});
	$('#init_total_up').sfLabel({text:'0'});
	$('#total_down_label').sfLabel({text:'down:'});
	$('#init_total_down').sfLabel({text:'0'});
	$('#pause_image').sfImage({src:'images/navi/pause.png'});
	
	for (var i = 0; i < 5; i++) {
		$('#download_0' + i +'_name').sfLabel({text:'Name'});
		$('#download_0' + i +'_hash').sfLabel({text:'roothash'});
		$('#download_0' + i +'_completed').sfLabel({text:'0'});
		$('#download_0' + i +'_size').sfLabel({text:'0'});
		$('#download_0' + i +'_progress').sfLabel({text:'('});
		$('#download_0' + i +'_status').sfLabel({text:'n/a'});
		$('#download_0' + i +'_dspeed_label').sfLabel({text:'DL: '});
		$('#download_0' + i +'_uspeed_label').sfLabel({text:'UL: '});
		$('#download_0' + i +'_seeders').sfLabel({text:'seeders: '});
		$('#download_0' + i +'_peers').sfLabel({text:'peers: '});
		$('#download_0' + i +'_separator').sfLabel({text:'/'});
		$('#download_0' + i +'_num_seeders').sfLabel({text:'0'});
		$('#download_0' + i +'_num_peers').sfLabel({text:'0'});
		$('#download_0' + i +'_eta').sfLabel({text:' remaining'});
		$('#download_0' + i +'_time_remaining').sfLabel({text:'0'});
		$('#download_0' + i +'_uspeed').sfLabel({text:'0'});
		$('#download_0' + i +'_dspeed').sfLabel({text:'0'});
		$('#download_0' + i +'_num_progress').sfLabel({text:'0'});
		$('#download_0' + i +'_percentage').sfLabel({text:'%)'});
	}
	
	for (var j = 0; j < 5; j++) {
		$("#progress_download" + j).sfProgressBar(this.progress_bar_type[0]);
	}
	
	download_list     = [download_zero, download_one, download_two, download_three, download_four];
	element_list      = [element_zero, element_one, element_two, element_three, element_four];
}