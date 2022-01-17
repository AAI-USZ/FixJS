function($){
    var Project = Backbone.Model.extend();

    var GitHub = Backbone.Collection.extend({
      model: Project,
      url: "http://github.com/api/v1/json/macasek?callback=?"
    });
  
    var ProjectView = Backbone.View.extend({
      tagName: 'li',
      className: 'project',
      templateStr: '<h3><a href="<%= project.get("url") %>" target="_blank"><%= project.get("name") %></a></h3><p class="body"><%= project.get("description") %></p><p class="source_time">Updated: <span class="time" data-date="<%= project.get("pushed_at") %>"><%= pretty_date %></span></p><div class="separator"></div>',

      initialize: function(){
        _.bindAll(this, 'render', "template");
      },
    
      render: function() {                                  
        var element = $(this.el); 
     
        element.html(this.template(this.model));
        element.find(".time").prettyDate();
         
        return this;
      },
      
      template: function(project) {
        return _.template(this.templateStr, { 
                            project: project, 
                            pretty_date: this.parseDate(project.get("pushed_at")) });
      },
      
      parseDate: function(date_str) { 
        if(date_str == undefined) {
          return "";
        }
        
        var d = new Date(date_str);
        var hours = d.getHours();
        var am_pm = "am";
        
        if(hours > 12) {
          am_pm = "pm";
          hours = hours - 12;
        }
        
        return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + hours + ":" + d.getMinutes() + am_pm;
      }
    });  
  
    var GitHubView = Backbone.View.extend({
      el: $('div#projects'),
    
      initialize: function() {
        _.bindAll(this, 'render', 'appendProject', 'appendProjects', 'refresh');  
      
        this.collection = new GitHub();
        this.collection.bind('reset', this.appendProjects);
      
        this.render();
        this.refresh();
      },
    
      render: function(){   
        this.el.append('<div class="header"><div class="right"><img src="images/spinner.gif" alt="loading..." height=16 width=16 /></div></div><div class="content"><ul id="project_list"></ul></div><div class="footer"><div class="right"><small><a href="http://github.com/macasek" target="_github">see more &raquo;</a></small></div></div>');
        
        return this;       
      },
      
      appendProjects: function(projects) {
        _(this.collection.models).each(function(project) {
          this.appendProject(project);
        }, this);
      },
        
      appendProject: function(project) {     
        var projectView = new ProjectView({
          model: project
        });
        $('ul#project_list', this.el).append(projectView.render().el);
      },
      
      refresh: function() {
        $("#projects .header img").show(); 
        
        var that = this;
        var projects = $.getJSON(this.collection.url, function(data, textStatus, jqXHR) { 
          $("#projects .header img").hide();
          
          if(textStatus == "success") {
            $("#projects").effect("highlight", {color:"#E8F5FB"}, 3000);
            $('ul#project_list', this.el).text("");     

            var repos = data.user.repositories
            
            // filter out private and empty repos
            repos = _.filter(repos, function(r){ 
              return (r.size != 0) && (!r.private); 
            });
            
            // convert to date objects for easier sorting 
            _.each(repos, function(r){
              r.pushed_at = new Date(r.pushed_at);
            });

            repos.sort(function(a,b) {
              return b.pushed_at - a.pushed_at;
            });  
            
            // set the most recent 5 to the collection
            that.collection.reset(repos.slice(0,5));
          }
        });     
      }  
    });
  
    window.githubView = new GitHubView();                             
  }