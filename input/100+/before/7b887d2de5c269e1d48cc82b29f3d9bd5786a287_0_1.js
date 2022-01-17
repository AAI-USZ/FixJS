function() {
	$('#skill-filter').change(function () { skill_filter_change('skill-', $(this).val()); });
	$('#skill_filter').change(function () { skill_filter_change('add-', $(this).val()); });
	$('#statsBase').change(stats_change);
	synergy_classes = ["warrior", "rogue", "channeller", "mechanist", "trickster", "battle-mage", "necromancer", "lore", "no-synergy"]
	stats_change();

	var activeTab = $('[href=' + location.hash + ']');
	activeTab && activeTab.tab('show');
	
	$('.add_ability').each(function () {
		if ($(this).attr('id').indexOf("Follower") != -1)
			$(this).change(function () { follower_selected($(this)) });
	});

	$('.skill-popover').popover({
		html : true,
		trigger : 'manual'
	}).mouseenter(function () {
		$(this).popover('show');
	}).mouseleave(function () {
		$(this).popover('hide');
	}).click(function () {
		$(this).popover('toggle');
	});

	recalculate_xp();
}