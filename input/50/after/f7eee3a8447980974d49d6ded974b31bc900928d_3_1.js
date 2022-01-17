function(){
        assert.equals("<link href='/css/app3.css' rel='stylesheet' media='screen'>", this.context.css("app3.css"));
        assert.equals("<link href='/css/app3.css' rel='stylesheet' media='print'>", this.context.css({print : 'app3.css'}));
      }