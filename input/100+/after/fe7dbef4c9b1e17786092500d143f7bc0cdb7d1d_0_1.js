function() {
    var app = this;
    var new_app = app.unrecognized ? $("#new-unrecognized-app").clone() : $("#new-app").clone();

    $(new_app).removeProp('id'); // erase cloded id
    for (prop in app) { // have all data available for later use
      $(new_app).find("section").data(prop, app[prop]);
    }

    // set values
    $(new_app).find("section").prop('id', app.dir_id);
    $(new_app).find("section").addClass("app");
    $(new_app).find("section").addClass(app.basic_name+"-app");
    $(new_app).find(".collapser").data('target', "#"+app.dir_id+"-details");
    $(new_app).find(".dir").append(app.dir);
    $(new_app).find(".collapser .app-name").append(renderMiniAppLogo(app.basic_name));
    $(new_app).find(".collapser .app-name").append(app.app_name);
    $(new_app).find(".collapse").attr('id', app.dir_id+"-details");
    $(new_app).find(".collapse .app-name").append(app.app_name);
    $(new_app).find(".collapse .project-link").append(renderAppProjectLink(app.app_name, app.project_url));
    $(new_app).find(".collapse .logo").append(renderAppLogo(app.basic_name));
    $(new_app).removeClass("hide").show();

    $(list).append(new_app);
  }