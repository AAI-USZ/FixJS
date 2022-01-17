function(){
        equals(formatDate(dp.calendar.selectedDate), '2012/05/06', "input中存在有效格式的日期时点击input");
        dp.hide();
        input.value = 'fdsa';
        ua.click(input);
        
        setTimeout(function(){
            equals(formatDate(dp.calendar.selectedDate), formatDate(new Date()), "input中存在无效格式的日期时点击input");
            
            dp.hide();
            input.value = '';
            ua.click(input);
            
            setTimeout(function(){
                equals(formatDate(dp.calendar.selectedDate), formatDate(new Date()), "input中无值时点击input");
                
                start();
                
                dp.dispose();
                document.body.removeChild(input);
            }, 100);
            
        }, 100);
        
    }