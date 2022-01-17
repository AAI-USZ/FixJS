function(){
	
	/*
	 * CC-47
	 * RIFCS-BUTTON on view page
	 */
	$('#rifcs_button').click(function(e){
		$('#rifcs_popup').show();
		e.stopPropagation();
	});
	
	$('body').click(function(){
		$('#rifcs_popup').hide();
	});
	
	$('#rifcs_view').click(function(){
		var key = $('#key').html();
		$.get(rootAppPath + 'orca/services/getRegistryObject.php?key='+encodeURIComponent(key)+'&type=plain',
	       function(data) {
			$('#rifcs_plain_content').val(data);
	        $.blockUI({
	            message: $('#rifcs_plain'),
	            css: {
	                width: '600px',
	                top:'20%',
	                left:'20%',
	                textAlign: 'left',
	                padding: '10px'
	                },
	                overlayCSS: { backgroundColor: '#000', opacity:   0.6}
            	});
            $('.blockOverlay').attr('title','Click to unblock').click($.unblockUI);
            $('.closeBlockUI').click($.unblockUI);
	       }
	   );
		$('#rifcs_popup').hide();
	});
	
	$('#rifcs_download').click(function(){
		$('#rifcs_popup').hide();
	});
	
	
	function htmlEntities(str) {
	    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}
	
	
	
	
	/*
	 * SOLR on Search page
	 */
   $('#solr-input').click(function(){
       $('#page').val('1');
       doSolrSearch();
   });

   $('#search').keypress(function(e){
       if(e.which==13){//press enter
           $('#page').val('1');
           doSolrSearch();
       }
   }).keyup(function(){//on typing
       //doSolrSearch();
   });


   $('.subjectFilter').live('click', function(){
       var solrURL = $('#solrUrl').val();
       var oSubject = $(this).attr('name');
       $.ajax({
         type: 'POST',
         url: solrURL,
         data: 'query=*:*&class=All&page=1&group=All&subject='+oSubject,
         success: function(msg){
             //console.log(msg);
             $('#search-result').html(msg);
         },
         error: function(msg){
             alert('ERROR'+msg);
         }
       });
   });

   $('.gotoPage').live('click', function(){
       var nextPage = $(this).attr('id');
       $('#page').val(nextPage);
       doSolrSearch();
   });

   $('.pagination-page').live('click', function(){
       var direction = $(this).attr('id');

       var currentPage = parseInt($('#page').val());
       if(direction == 'next'){
           nextPage = currentPage + 1;
       }else if(direction == 'prev'){
           nextPage = currentPage - 1;
       }
       $('#page').val(nextPage);
       doSolrSearch();
   });

   $('.infoIcon').click(function(e){
       e.stopImmediatePropagation();
       var id = $(this).attr('id');
       var logTypeID = id.replace(/_info/,"_type");
       var logDescriptionID = id.replace(/_info/,"_desc");
       var description = $('#'+logDescriptionID).html();
       var title = $('#'+logTypeID).html();
       description = formatErrorDesciption(description, title);
       $.blockUI({
       message: description,
       css: {
           top:  ($(window).height() - 800) /2 + 'px',
           left: ($(window).width() - 400) /2 + 'px',
           width: '600px',
           textAlign: 'left',
            padding: '10px'},
       overlayCSS: { backgroundColor: '#000', opacity:   0.6}
       });
       $('.blockOverlay').attr('title','Click to unblock').click($.unblockUI);
   });

   //chosen on data source;
   if($('select[name=data_source_key]').length>0)$('select[name=data_source_key]').chosen();

}