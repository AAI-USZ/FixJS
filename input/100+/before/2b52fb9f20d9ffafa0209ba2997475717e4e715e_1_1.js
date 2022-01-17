function(){
    var self = this;
    this.startSearch = function(query){
        $("#searchStatus").hide();
        $("#loading").show();
        $.ajax("/search.json", {data:{q:query}, success:function(data){
            $("#results ul").empty();
            for(i=0; i < data.length;i++){
                self.addResult(data[i]);
            }
            $("#loading").hide();
            $("#searchStatus").find("strong").text(query.replace("+"," "));
            $("#searchStatus").find("div.count").text(data.length+" result"+
                                                      (data.length != 1 ? "s":"")
                                                      +" found");
            $("#searchStatus").fadeIn('fast');
            if($(window).width() <= 600)
                $(window).scrollTop(80);
        }});
        self.transfromToResults();
    };

    this.clearTransforms = function(){
        $("body").removeClass("results");
    }

    this.transfromToResults = function(){
        $("body").addClass("results");
   };

    this.addResult = function(result){
        $("#results ul").append(Mustache.render(self.resultTemplate, result).replace(/\n/g, "<br />"));
    };
    this.resultTemplate = "<li><h1><a href='/articles/{{id}}'>{{title}}</a></h1>"+
        "<div class='preview'>{{preview}}</div>" +
        "</li>";
}