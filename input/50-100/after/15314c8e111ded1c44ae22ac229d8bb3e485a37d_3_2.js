function(y){
		this.anim = new Y.Anim({
          node: 'window',
          from: {
			scroll: [Y.DOM.docScrollX(),Y.DOM.docScrollY()]
          },
          to: {
            scroll : [Y.DOM.docScrollX(),y]
          },
          duration: 0.3,
          easing:  Y.Easing.easeOutStrong
        }).run();
		/**  //http://yuilibrary.com/yui/docs/api/classes/Easing.html
		* backBoth backIn backOut bounceBoth bounceIn bounceOut easeBoth easeBothStrong easeIn easeInStrong easeNone easeOut easeOutStrong elasticBoth elasticIn elasticOut
		*/
       
    }