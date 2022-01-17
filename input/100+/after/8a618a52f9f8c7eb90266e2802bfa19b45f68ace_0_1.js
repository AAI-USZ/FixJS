function() {

  /**
   * reccord a cookie for session with the logged user
   * @param user see user.js
   */
  reccordLoginCookie=function(user) {
    $.cookie('redback_login', ko.toJSON(user));
  }

  getUserFromLoginCookie=function(){
    return $.parseJSON($.cookie('redback_login'));
  }

  deleteLoginCookie=function(){
    $.cookie('redback_login', null);
  }

  logout=function(doScreenChange){
    deleteLoginCookie();
    $("#login-link").show();
    $("#register-link").show();
    $("#logout-link").hide();
    $("#change-password-link").hide();
    hideElementWithKarma();
    if (doScreenChange) screenChange();
    $("#main-content").html("");
    $.ajax({
      url: 'restServices/redbackServices/loginService/logout'
    });
  }

  // handle url with registration link
  checkUrlParams=function(){
    var validateMeId = $.urlParam('validateMe');
    if (validateMeId) {
      validateKey(validateMeId);
      return;
    }
    var resetPassword= $.urlParam('resetPassword');
    if (resetPassword){
      resetPasswordForm(resetPassword);
      return;
    }
    // by default display search screen
    window.sammyArchivaApplication.setLocation("#search");
  }

  hasKarma=function(karmaName){
    return $.inArray(karmaName,window.redbackModel.operatioNames)>=0;
  }

  decorateMenuWithKarma=function(user) {
    var username = user.username;
    $.log("decorateMenuWithKarma");
    // we can receive an observable user so take if it's a function or not
    if ($.isFunction(username)){
      username = user.username();
    }
    var url = 'restServices/redbackServices/userService/getCurrentUserOperations';
    $.ajax({
      url: url,
      success: function(data){
        var mappedOperations = $.map(data, function(item) {
            return mapOperation(item);
        });
        window.redbackModel.operatioNames = $.map(mappedOperations, function(item){
          return item.name();
        });

        $("#topbar-menu-container [redback-permissions]").each(function(element){
          checkElementKarma(this);
        });
        $("#sidebar-content [redback-permissions]").each(function(element){
          checkElementKarma(this);
        });
        checkUrlParams();
      }
    });
  }

  checkElementKarma=function(element){
    var bindingValue = $(element).attr("redback-permissions");
    $(element).hide();
    var neededKarmas = $(eval(bindingValue)).toArray();
    var karmaOk = false;
    $(neededKarmas).each(function(value){
      if ($.inArray(neededKarmas[value],window.redbackModel.operatioNames)>=0) {
        karmaOk = true;
      }
    });
    if (karmaOk == false) {
      $(element).hide();
    } else {
      $(element).show();
    }
  }

  hideElementWithKarma=function(){
    $("#topbar-menu-container [redback-permissions]").each(function(element){
      $(this).hide();
    });

    $("#sidebar-content [redback-permissions]").each(function(element){
      $(this).hide();
    });
    $.log("hideElementWithKarma");
  }

  //------------------------------------//
  // Change UI with appearance settings //
  //------------------------------------//
  updateAppearanceToolBar=function() {
      $.ajax("restServices/archivaServices/archivaAdministrationService/getOrganisationInformation", {
          type: "GET",
          dataType: 'json',
          success: function(data) {
              if(data.url){
                var url = data.url.startsWith("http://") || data.url.startsWith("https://") ? data.url : "http://"+data.url;
                var link="<a href='"+url+"' class='brand'>";
                if (data.logoLocation) {
                    link+="<img src='"+data.logoLocation+"' style='max-height: 30px'/>";
                } else if (data.name) {
                    link+=data.name;
                } else {
                    link+="Archiva";
                }
                link+="</a>";
                $("#organisation-logo").html(link);
              }
            if (!data.url && data.name){
              $("#organisation-logo").html("<a href='/' class='brand'>"+data.name+"</a>");
            }
            if (!data.url && !data.name){
              $("#organisation-logo").html("<a href='/' class='brand'>Archiva</a>");
            }
          },
          error: function() {
              $("#organisation-logo").html("<a href='/' class='brand'>Archiva</a>");
          }
      });
  }


  MainMenuViewModel=function() {
      
      var self = this;
      this.artifactMenuItems = [
              {  text : $.i18n.prop('menu.artifacts') , id: null},
              {  text : $.i18n.prop('menu.artifacts.search') , id: "menu-find-search-a", href: "#search" , func: function(){displaySearch(this)}},
              {  text : $.i18n.prop('menu.artifacts.browse') , id: "menu-find-browse-a", href: "#browse" , func: function(){displayBrowse(true)}},
              {  text : $.i18n.prop('menu.artifacts.upload') , id: "menu-find-upload-a", href: "#upload" , redback: "{permissions: ['archiva-upload-repository']}", func: function(){displayUploadArtifact(true)}}
      ];
      this.administrationMenuItems = [
              {  text : $.i18n.prop('menu.administration') , id: null},
              {  text : $.i18n.prop('menu.repository.groups')        , id: "menu-repository-groups-list-a"     , href: "#repositorygroup"  , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayRepositoryGroups()}},
              {  text : $.i18n.prop('menu.repositories')             , id: "menu-repositories-list-a"           , href: "#repositorylist"   , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayRepositoriesGrid()}},
              {  text : $.i18n.prop('menu.proxy-connectors')         , id: "menu-proxy-connectors-list-a"       , href: "#proxyconnectors"  , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayProxyConnectors()}},
              {  text : $.i18n.prop('menu.network-proxies')          , id: "menu-network-proxies-list-a"        , href: "#networkproxies"       , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayNetworkProxies()}},
              {  text : $.i18n.prop('menu.legacy-artifact-support')  , id: "menu-legacy-support-list-a"         , href: "#legacy"           , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayLegacyArtifactPathSupport()}},
              {  text : $.i18n.prop('menu.repository-scanning')      , id: "menu-repository-scanning-list-a"    , href: "#scanningList"     , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayRepositoryScanning()}},
              {  text : $.i18n.prop('menu.network-configuration')    , id: "menu-network-configuration-list-a"  , href: "#network"          , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayNetworkConfiguration()}},
              {  text : $.i18n.prop('menu.system-status')            , id: "menu-system-status-list-a"          , href: "#status"           , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displaySystemStatus()}},
              {  text : $.i18n.prop('menu.appearance-configuration') , id: "menu-appearance-list-a"             , href: "#appearance"       , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayAppearanceConfiguration()}},
              {  text : $.i18n.prop('menu.ui-configuration')         , id: "menu-ui-configuration-list-a"       , href: "#uiconfig"         , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayUiConfiguration()}},
              {  text : $.i18n.prop('menu.reports')                  , id: "menu-report-list-a"                 , href: "#reports"         , redback: "{permissions: ['archiva-manage-configuration']}", func: function(){displayReportsPage()}}
      ];
      
      this.usersMenuItems = [
              {  text : $.i18n.prop('menu.users') , id: null},
              {  text : $.i18n.prop('menu.users.manage')    , id: "menu-users-list-a", href: "#users" , redback: "{permissions: ['archiva-manage-users']}", func: function(){displayUsersGrid()}},
              {  text : $.i18n.prop('menu.users.roles')     , id: "menu-roles-list-a", href: "#roles" , redback: "{permissions: ['archiva-manage-users']}", func: function(){displayRolesGrid()}}
      ];
      this.activeMenuId = ko.observable();
          
      window.sammyArchivaApplication = Sammy(function () {
        this.get('#open-admin-create-box',function(){
          $.log("#open-admin-create-box");
          adminCreateBox();
        });

        // #artifact-(optionnal repositoryId)
        // format groupId:artifactId org.apache.maven.plugins:maven-jar-plugin
        // or  groupId:artifactId:version org.apache.maven.plugins:maven-jar-plugin:2.3.1
        this.get('#artifact/:groupId/:artifactId',function(context){
          var groupId= this.params['groupId'];
          var artifactId= this.params['artifactId'];
          $.log("get #artifact:"+groupId+":"+artifactId);
          goToBrowseArtifactDetail(groupId,artifactId);//,null,null);
          return;

        });
        this.get('#artifact:repositoryId/:groupId/:artifactId/:version',function(context){

          var repositoryId = this.params['repositoryId'];
          var groupId= this.params['groupId'];
          var artifactId= this.params['artifactId'];
          var version= this.params['version'];

          if(!version){
            displayBrowseArtifactDetail(splitted[0],splitted[1]);//,null,null);
          } else {
            generalDisplayArtifactDetailsVersionView(groupId,artifactId,version,repositoryId);
          }
        });
        this.get('#browse/:groupId',function(context){
          var groupId = this.params['groupId'];
          if (groupId){
            displayBrowseGroupId(groupId);
          } else {
            displayBrowse(true);
          }
        });
        this.get('#:folder', function () {
          var folder = this.params.folder;
          self.activeMenuId(folder);
          var baseItems = self.artifactMenuItems?self.artifactMenuItems:[];
          ko.utils.arrayFirst(baseItems.concat(self.usersMenuItems, self.administrationMenuItems), function(p) {
            if ( p.href == "#"+self.activeMenuId()) {
              p.func();
              return;
            }
          });
        });
        //this.get('', function () { this.app.runRoute('get', '#search') });
      });
      sammyArchivaApplication.run();
  }

  userLoggedCallbackFn=function(user){
    $.log("userLoggedCallbackFn:"+ (user?user.username:null));

    if (!user) {
      $("#login-link").show();
      $("#register-link").show();
      $("#change-password-link").hide();
      checkUrlParams();
    } else {
      $("#change-password-link").show();
      $("#logout-link").show();
      $("#register-link").hide();
      $("#login-link").hide();
      decorateMenuWithKarma(user);
    }
  }

  checkSecurityLinks=function(){
    userLogged(userLoggedCallbackFn);
  }

  checkCreateAdminLink=function(callbackFn){
    $.ajax("restServices/redbackServices/userService/isAdminUserExists", {
      type: "GET",
      dataType: 'json',
      success: function(data) {
        var adminExists = data;
        if (adminExists == false) {
          $("#create-admin-link").show();
          $("#login-link").hide();
          $("#register-link").hide();
        } else {
          $("#create-admin-link").hide();
        }
        if(callbackFn){
          callbackFn()
        }
        $.log("adminExists:"+adminExists);
      }
    });
  }

  startArchivaApplication=function(){

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


}