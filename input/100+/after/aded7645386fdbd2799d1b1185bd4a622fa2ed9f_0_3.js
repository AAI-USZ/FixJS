function(){
                var currentTime = new Date()
                var timeoffset = currentTime.getTimezoneOffset();
                var month = currentTime.getMonth()+1
                var day = currentTime.getDate()
                var weekPast = day-7
                var year = currentTime.getFullYear()

                month = (month.length > 1) ? month : "0"+month;
                day = (day.length > 1) ? day : "0"+day;
                weekPast = (weekPast.length > 1) ? weekPast : "0"+weekPast;

                //Set value of start time
                $('#dpstart').val(month + "/" + weekPast + "/" + year)

                var to = $('<li></li>').append($('<a>To</a>').attr({cursor : 'none', hover : 'none'}))
                var whiteIcon = $('<i></i>')
                    .attr({class : 'icon-remove icon-white', id : 'iconremove'})
                    .click(function(){
                        to.remove();
                        datepicker.remove();
                        $('#dpstart').after($('<i class="icon-calendar icon-white" id="firsticon"">'))
                    });
                console.log()
                var te = $;
                if($('#dpend').exists()){
                    
                }
                else {
                    //create and add new start time
                    var datepicker = $('<li></li>')
                    .append($('<input>')
                        .attr({width: 80, class : 'datepicker', id : 'dpend', type : 'text', value : month + "/" + day + "/" + year})
                        .datepicker({onSelect: function(date){
                            var date = $('#dpstart').val().split('/');
                            var endDate = $(this).val().split('/')
                            startTime=Date.UTC(date[2],date[0]-1,date[1]) / 1000 + timeoffset*60 - 21600;
                            endTime=Date.UTC(endDate[2],endDate[0]-1,endDate[1]) / 1000 + timeoffset*60 + 21600;     
                            if(endTime < startTime) {
                                $('#dpstart').val($(this).val());
                           }
                        }})
                    )
                    .append(whiteIcon);
                    $('#timestart').after(to);
                    to.after(datepicker);
                    $('#firsticon').remove();
                 }
            }