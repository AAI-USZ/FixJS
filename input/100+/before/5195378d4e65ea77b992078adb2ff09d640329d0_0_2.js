function(){
	$('#tabs div').hide();
	$('#tabs div:first').show();
	$('#tabs ul li:first').addClass('active');
	$('<br /><form action="add_to_cart.php"><input type="submit" value="Add to Cart" method="post" class="photo" style="margin-left:100px;" /></form><br />').insertAfter('.lytebox');

	var i = 1;
	
	var ids = [];

	$('.photo').each(function() {
		$(this).attr('name', function() {
			ids.push(i);
			return i;
		});
		
		i++;
	});

	$('#tabs ul li a').click(function(){
	$('#tabs ul li').removeClass('active');
	$(this).parent().addClass('active');
	var currentTab = $(this).attr('href');
	$('#tabs div').hide();
	$(currentTab).show();
	$('.lytebox').remove('<br /><form action="add_to_cart.php"><input type="submit" value="Add to Cart" method="post" class="photo" style="margin-left:100px;" /></form><br />');
	$('<br /><form action="add_to_cart.php"><input type="submit" value="Add to Cart" method="post" class="photo" style="margin-left:100px;" /></form><br />').insertAfter('.lytebox');

	var desc = $('.photo').closest('img').attr('alt');
	$('.photo').attr('name', desc);

	return false;
});
}