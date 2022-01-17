function(dataSource) {

                var
                i=0,
                ele = this.element = $(this.element),
                select = ele.hide(),
                selected = select.children( ":selected" ),
                data = 0,
                wrapper = this.wrapper = $("<span>")
                    .addClass( ele.attr('class').toString() )
                    .insertAfter( select ),
                text = this.text = $("<span>")
                    .appendTo( wrapper ),
                list = $("<ul>")
                    .appendTo( wrapper );

                if(dataSource) {
                    data = dataSource[ ele.attr('name') ];
                    text.text(ele.text() || data[0][1]);
                    console.log(data);
                } else {
                    text.text("");
                }

                wrapper.click( function() {
                    list.empty();

                    if(!dataSource) {
                        data = select.children( "option" ).map(function() {
                            return [[ $( this ).text(), $( this ).attr('value') ]];
                        });
                    }

                    for(i=0; i<data.length; ++i) {
                        var 
                        ul = $("<li>" + data[i][0].toString() + "</li>")
                            .attr('title', data[i][1])
                            .click( function() {
                                text.text(this.title);
                                $("option", select).attr('selected', false);
                                $("option[value='"+ this.title +"']", select).attr('selected',true);
                                select.change();
                            }); 
                        list.append(ul);

                    }
                    list.toggle();
                })
                .mouseleave( function() {
                    list.hide();
                })
			


                //return ele;	
		}