function () {
	$('#ratio_label').sfLabel({text: 'Ratio:'});
	$('#total_up_label').sfLabel({text:'up:'});
	$('#init_total_up').sfLabel({text:'0'});
	$('#total_down_label').sfLabel({text:'down:'});
	$('#init_total_down').sfLabel({text:'0'});
	$('#pause_image').sfImage({src:'images/navi/pause.png'});
	
	for (var i = 0; i < 5; i++) {
		$('#0' + i +'_download_name').sfLabel({text:'Name'});
		$('#0' + i +'_download_hash').sfLabel({text:'roothash'});
		$('#0' + i +'_download_completed').sfLabel({text:'0'});
		$('#0' + i +'_download_size').sfLabel({text:'0'});
		$('#0' + i +'_download_progress').sfLabel({text:'('});
		$('#0' + i +'_download_status').sfLabel({text:'n/a'});
		$('#0' + i +'_download_dspeed_label').sfLabel({text:'DL: '});
		$('#0' + i +'_download_uspeed_label').sfLabel({text:'UL: '});
		$('#0' + i +'_download_seeders').sfLabel({text:'seeders: '});
		$('#0' + i +'_download_peers').sfLabel({text:'peers: '});
		$('#0' + i +'_download_separator').sfLabel({text:'/'});
		$('#0' + i +'_download_num_seeders').sfLabel({text:'0'});
		$('#0' + i +'_download_num_peers').sfLabel({text:'0'});
		$('#0' + i +'_download_eta').sfLabel({text:' remaining'});
		$('#0' + i +'_download_time_remaining').sfLabel({text:'0'});
		$('#0' + i +'_download_uspeed').sfLabel({text:'0'});
		$('#0' + i +'_download_dspeed').sfLabel({text:'0'});
		$('#0' + i +'_download_num_progress').sfLabel({text:'0'});
		$('#0' + i +'_download_percentage').sfLabel({text:'%)'});
	}
	
	for (var j = 0; j < 5; j++) {
		$("#progress_download" + j).sfProgressBar(this.progress_bar_type[0]);
	}
	
	download_list     = [download_zero, download_one, download_two, download_three, download_four];
	element_list      = [element_zero, element_one, element_two, element_three, element_four];
}