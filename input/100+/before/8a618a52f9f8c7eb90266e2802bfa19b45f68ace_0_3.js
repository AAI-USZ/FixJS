function(){

    $.log("startArchivaApplication");
    $('#topbar-menu-container').html($("#topbar_menu_tmpl" ).tmpl());
    $('#sidebar-content').html($("#main_menu_tmpl").tmpl());

    ko.bindingHandlers.redbackP = {
      init: function(element, valueAccessor) {
          $(element).attr("redback-permissions",valueAccessor);
          }
    };

    ko.applyBindings(new MainMenuViewModel());

    hideElementWithKarma();
    checkSecurityLinks();
    checkCreateAdminLink();
    $('#footer-content').html($('#footer-tmpl').tmpl(window.archivaRuntimeInfo));

    $( "#quick-search-autocomplete" ).autocomplete({
      minLength: 3,
      delay: 600,
			source: function(request, response){
        $.get("restServices/archivaServices/searchService/quickSearch?queryString="+encodeURIComponent(request.term),
           function(data) {
             var res = mapArtifacts(data);
             var uniqId = [];
             var uniqArtifactIds=[];
             for (var i= 0;i<res.length;i++){
               if ( $.inArray(res[i].artifactId,uniqId)<0){
                 uniqId.push(res[i].artifactId);
                 uniqArtifactIds.push(res[i]);
               }
             }
             response(uniqArtifactIds);
           }
        );
      },
      select: function( event, ui ) {
        $.log("select artifactId:"+ui.item.artifactId);
        // user can be in a non search view so init the search view first
        var searchViewModel = new SearchViewModel();
        var searchRequest = new SearchRequest();
        searchRequest.artifactId(ui.item.artifactId);
        searchViewModel.searchRequest(searchRequest);
        displaySearch(function(){
          searchViewModel.externalAdvancedSearch();
        },searchViewModel);
      }
		}).data( "autocomplete" )._renderItem = function( ul, item ) {
							return $( "<li></li>" )
								.data( "item.autocomplete", item )
								.append( "<a>" + item.artifactId + "</a>" )
								.appendTo( ul );
						};
    updateAppearanceToolBar();

  }