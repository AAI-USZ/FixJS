function(){
        if ($content.val().trim() === '') {
            return;
        }
        var date = new Date();
        var timeStr =
            /*date.getFullYear() + '年' +*/
            (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + (date.getHours() / 100).toFixed(2).substr( - 2) + ':' + (date.getMinutes() / 100).toFixed(2).substr( - 2);
        var contentStr = $content.val();
        var styleStr = contentStr.length < 16 ? 'brick-tiny': 'brick-normal';
        //console.log($content.val());
        Speaks.insert({
			name: $name.val().substr(0, 12) || '无名氏',
            content: $content.val().substr(0, 120),
            time: timeStr,
            elapsedTime: Date.now(),
            style: styleStr
        });
        localStorage.name = $name.val();
        $content.val(null);
    }