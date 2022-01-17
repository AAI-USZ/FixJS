function() {
        // code to run on server at startup
        if (Speaks.find().count() === 0) {
            Speaks.remove({});
            Speaks.insert({
                name: 'Houks',
                content: '各位好，我是新的DianTv君，你们可以通过http://192.168.7.7:7777/来访问我，DianTv君不喜欢说话，你们来说好了，不过不要有诽谤、脏话、侵犯隐私等危险言论嗯，可以有技术含量的TX...',
                time: 'From 192.168.7.77:7777',
                elapsedTime: Date.now(),
                style: 'brick-huge'
            });
        }
    }