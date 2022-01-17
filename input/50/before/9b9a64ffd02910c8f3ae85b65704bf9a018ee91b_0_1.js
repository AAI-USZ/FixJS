function setPreloadAttributesAndNavigate(){
      window.preloads.post = post.attributes
      app.router.navigate(post.url(), true)
    }