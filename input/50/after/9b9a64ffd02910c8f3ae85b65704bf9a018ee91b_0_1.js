function setPreloadAttributesAndNavigate(){
      window.preloads.post = post.attributes
      app.router.navigate(post.url(), {trigger:true, replace: true})
    }