function(){
            this.superInit();
            
            // ラベル
            this.fromJSON(UI_DATA.LABELS);
            this.scoreLabel.text = "score : "+userData.score;
            
            // ツイートボタン
            var msg = tm.social.Twitter.createURL({
                type: "tweet",
                text: "Chain Wave\nScore : {0}連鎖\n".format(userData.score),
                hashtags: "ChainWave,tmlibjs",
                url: "http://bit.ly/MsUcIt"
            });
            var tweetButton = tm.app.iPhoneButton(120, 60, "black");
            tweetButton.setPosition(app.width/2, 480);
            tweetButton.label.text = "Tweet";
            this.addChild(tweetButton);
            tweetButton.onpointingstart = function(){
                window.open(msg, "_self");
            };
        }