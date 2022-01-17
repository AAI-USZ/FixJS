function AlterParanoia() {
	// Required Ratio is almost deducible from downloaded, the count of seeding and the count of snatched
	// we will "warn" the user by automatically checking the required ratio box when they are
	// revealing that information elsewhere
	if(!$('input[name=p_ratio]').raw()) {
		return;
	}
	var showDownload = $('input[name=p_downloaded]').raw().checked || ($('input[name=p_uploaded]').raw().checked && $('input[name=p_ratio]').raw().checked);
	if (($('input[name=p_seeding_c]').raw().checked) && ($('input[name=p_snatched_c]').raw().checked) && showDownload) {
		$('input[type=checkbox][name=p_requiredratio]').raw().checked = true;
		$('input[type=checkbox][name=p_requiredratio]').raw().disabled = true;
	} else {
		$('input[type=checkbox][name=p_requiredratio]').raw().disabled = false;
	}
	$('input[name=p_torrentcomments_l]').raw().disabled = !$('input[name=p_torrentcomments_c]').raw().checked;
	$('input[name=p_collagecontribs_l]').raw().disabled = !$('input[name=p_collagecontribs_c]').raw().checked;
	$('input[name=p_requestsfilled_list]').raw().disabled = !($('input[name=p_requestsfilled_count]').raw().checked && $('input[name=p_requestsfilled_bounty]').raw().checked);
	$('input[name=p_requestsvoted_list]').raw().disabled = !($('input[name=p_requestsvoted_count]').raw().checked && $('input[name=p_requestsvoted_bounty]').raw().checked);
	$('input[name=p_uploads_l]').raw().disabled = !$('input[name=p_uploads_c]').raw().checked;
	$('input[name=p_seeding_l]').raw().disabled = !$('input[name=p_seeding_c]').raw().checked;
	$('input[name=p_leeching_l]').raw().disabled = !$('input[name=p_leeching_c]').raw().checked;
	$('input[name=p_snatched_l]').raw().disabled = !$('input[name=p_snatched_c]').raw().checked;
	UncheckIfDisabled($('input[name=p_torrentcomments_l]').raw());
	UncheckIfDisabled($('input[name=p_collagecontribs_l]').raw());
	UncheckIfDisabled($('input[name=p_requestsfilled_list]').raw());
	UncheckIfDisabled($('input[name=p_requestsvoted_list]').raw());
	UncheckIfDisabled($('input[name=p_uploads_l]').raw());
	UncheckIfDisabled($('input[name=p_seeding_l]').raw());
	UncheckIfDisabled($('input[name=p_leeching_l]').raw());
	UncheckIfDisabled($('input[name=p_snatched_l]').raw());
	if ($('input[name=p_collagecontribs_l]').raw().checked) {
		$('input[name=p_collages_c]').raw().disabled = true;
		$('input[name=p_collages_l]').raw().disabled = true;
		$('input[name=p_collages_c]').raw().checked = true;
		$('input[name=p_collages_l]').raw().checked = true;
	} else {
		$('input[name=p_collages_c]').raw().disabled = false;
		$('input[name=p_collages_l]').raw().disabled = !$('input[name=p_collages_c]').raw().checked;
		UncheckIfDisabled($('input[name=p_collages_l]').raw());
	}
}