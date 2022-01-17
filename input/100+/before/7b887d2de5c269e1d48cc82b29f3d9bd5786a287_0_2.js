function show_skill_levels()
{
	$('.skill-level').css('display', 'none');
	$('.skill-level-select').css('display', 'block');
	$('.power').css('color', '#ddd');
	$('.disable-button').attr('disabled', true);
	$('.disable-button').click(function () { return false; });
}