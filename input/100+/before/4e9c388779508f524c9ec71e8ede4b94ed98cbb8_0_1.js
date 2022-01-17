function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			var css = '#userTaggerToolTip { display: none; position: absolute; width: 334px; height: 248px; }';
			css += '#userTaggerToolTip label { margin-top: 5px; clear: both; float: left; width: 110px; }';
			css += '#userTaggerToolTip input[type=text], #userTaggerToolTip select { margin-top: 5px; float: left; width: 195px; border: 1px solid #c7c7c7; border-radius: 3px 3px 3px 3px; -moz-border-radius: 3px 3px 3px 3px; -webkit-border-radius: 3px 3px 3px 3px; margin-bottom: 6px; }';
			css += '#userTaggerToolTip input[type=checkbox] { margin-top: 5px; float: left; }';
			css += '#userTaggerToolTip input[type=submit] { cursor: pointer; position: absolute; right: 16px; bottom: 16px; padding-top: 3px; padding-bottom: 3px; padding-left: 5px; padding-right: 5px; font-size: 12px; color: #ffffff; border: 1px solid #636363; border-radius: 3px 3px 3px 3px; -moz-border-radius: 3px 3px 3px 3px; -webkit-border-radius: 3px 3px 3px 3px; background-color: #5cc410; } ';
			css += '#userTaggerToolTip .toggleButton { margin-top: 5px; margin-bottom: 5px; }';
			css += '#userTaggerClose { position: absolute; right: 7px; top: 7px; z-index: 11; }';

			css += '.ignoredUserComment { color: #CACACA; padding: 3px; font-size: 10px; }';
			css += '.ignoredUserPost { color: #CACACA; padding: 3px; font-size: 10px; }';
			css += 'a.voteWeight { text-decoration: none; color: #336699; }';
			css += 'a.voteWeight:hover { text-decoration: none; }';
			css += '#authorInfoToolTip { display: none; position: absolute; width: 412px; z-index: 10001; }';
			css += '#authorInfoToolTip .authorLabel { float: left; width: 140px; margin-bottom: 12px; }';
			css += '#authorInfoToolTip .authorDetail { float: left; width: 240px; margin-bottom: 12px; }';
			css += '#authorInfoToolTip .blueButton { float: right; margin-left: 8px; cursor: pointer; margin-top: 12px; padding-top: 3px; padding-bottom: 3px; padding-left: 5px; padding-right: 5px; font-size: 12px; color: #ffffff !important; border: 1px solid #636363; border-radius: 3px 3px 3px 3px; -moz-border-radius: 3px 3px 3px 3px; -webkit-border-radius: 3px 3px 3px 3px; background-color: #107ac4; }';
			css += '#authorInfoToolTip .redButton { float: right; margin-left: 8px; cursor: pointer; margin-top: 12px; padding-top: 3px; padding-bottom: 3px; padding-left: 5px; padding-right: 5px; font-size: 12px; color: #ffffff !important; border: 1px solid #bc3d1b; border-radius: 3px 3px 3px 3px; -moz-border-radius: 3px 3px 3px 3px; -webkit-border-radius: 3px 3px 3px 3px; background-color: #ff5757; }';

			css += '#benefits { width: 200px; margin-left: 0px; }';
			css += '#userTaggerToolTip #userTaggerVoteWeight { width: 30px; }';
			css += '.RESUserTagImage { display: inline-block; width: 16px; height: 8px; background-image: url(\'http://e.thumbs.redditmedia.com/r22WT2K4sio9Bvev.png\'); background-repeat: no-repeat; background-position: -16px -137px; }';
			css += '.userTagLink { display: inline-block; }';
			css += '.hoverHelp { margin-left: 3px; cursor: pointer; color: #336699; text-decoration: underline; }';
			css += '.userTagLink.hasTag, #userTaggerPreview { display: inline-block; padding: 0px 4px 0px 4px; border: 1px solid #c7c7c7; border-radius: 3px 3px 3px 3px; -moz-border-radius: 3px 3px 3px 3px; -webkit-border-radius: 3px 3px 3px 3px; }';
			css += '#userTaggerPreview { float: left; height: 16px; margin-bottom: 10px; }';
			css += '#userTaggerToolTip .toggleButton .toggleOn { background-color: #107ac4; color: #ffffff;  }';
			css += '#userTaggerToolTip .toggleButton.enabled .toggleOn { background-color: #dddddd ; color: #636363; }';
			css += '#userTaggerToolTip .toggleButton.enabled .toggleOff { background-color: #d02020; color: #ffffff; }'; 
			css += '#userTaggerToolTip .toggleButton .toggleOff { background-color: #dddddd; color: #636363; } ';
			css += '#userTaggerTable th { -moz-user-select: none; -webkit-user-select: none; -o-user-select: none; user-select: none; }'
			css += '#userTaggerTable tbody .deleteButton { width: 16px; height: 16px; background-image: url(data:image/gif;base64,R0lGODlhEAAQAOZOAP///3F6hcopAJMAAP/M//Hz9OTr8ZqksMTL1P8pAP9MDP9sFP+DIP8zAO7x8/D1/LnEz+vx+Flha+Ln7OLm61hhayk0QCo1QMfR2eDo8b/K1M/U2pqiqcfP15WcpcLK05ymsig0P2lyftnf5naBi8XJzZ6lrJGdqmBqdKissYyZpf/+/puotNzk66ayvtbc4rC7x9Xd5n+KlbG7xpiirnJ+ivDz9KKrtrvH1Ojv9ePq8HF8h2x2gvj9/yYyPmRueFxlb4eRm+71+kFLVdrb3c/X4KOnrYGMl3uGke/0+5Sgq1ZfaY6Xn/X4+f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAE4ALAAAAAAQABAAAAexgE6CggGFAYOIiAEPEREPh4lOhpOUgwEAmJmaABuQAUktMUUYGhAwLiwnKp41REYmHB5MQUcyN0iQTjsAHU05ICM4SjMQJIg8AAgFBgcvE5gUJYgiycsHDisCApjagj/VzAACBATa5AJOKOAHAAMMDOTvA05A6w7tC/kL804V9uIKAipA52QJgA82dNAQRyBBgwYJyjmRgKmHkAztHA4YAJHfEB8hLFxI0W4AACcbnQQCADs=)}';
			
			RESUtils.addCSS(css);
		}
	}