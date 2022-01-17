function(y){
		this.anim = new Y.Anim({
          node: 'window',
          from: {
			scroll: [Y.DOM.docScrollX(),Y.DOM.docScrollY()]
          },
          to: { // can't scoll to target if it's beyond the doc height - window height
            scroll : [Y.DOM.docScrollX(),y]
          },
          duration: 0.5,
          easing:  Y.Easing.easeOutStrong
        }).run();
/**
backBoth backIn backOut bounceBoth bounceIn bounceOut
easeBoth
easeBothStrong
easeIn
easeInStrong
easeNone
easeOut
easeOutStrong
elasticBoth
elasticIn
elasticOut
*/
        //http://yuilibrary.com/yui/docs/api/classes/Easing.html
    }