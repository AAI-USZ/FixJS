function () {
         var el = doc.createElement('div')
         el.style.display = 'none'
         doc.body.appendChild(el)
         this.el = el
         this.removeEvent = ENV.bind(this.remove,this)
         this.transEvent = ENV.bind(this._afterAnimation,this)
         ENV.domLoaded = true
      }