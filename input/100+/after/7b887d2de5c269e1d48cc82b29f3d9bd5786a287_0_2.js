function show_skill_levels()
{
	skill_levels_run += 1
	$('.skill-level').css('display', 'none');
	$('.skill-level-select').css('display', 'block');
	$('.power').css('color', '#ddd');
	$('.disable-button').attr('disabled', true);
	$('.disable-button').click(function () { return false; });

	$('#skill-levels').html('')
	$('#skill-levels').append('<i class="icon-ok icon-white"></i> Save Changes')

	$('#skill-levels').click(submit_skill_levels);
}