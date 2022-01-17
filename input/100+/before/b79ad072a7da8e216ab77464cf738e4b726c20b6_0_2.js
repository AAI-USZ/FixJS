function( $ ){


    $.widget( "ui.selectBox", {
          
		_create: function(dataSource) {

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
		},

        setText : function(value) {
            this.text.text(value);
        },

        destroy: function() {
            this.text.remove();
            this.wrapper.remove();
            this.element.show();
            $.Widget.prototype.destroy.call( this );
        }
	});


    var topics = {};

    $.fn.Topic = function( id ) {
        var callbacks,
            topic = id && topics[ id ];
        if ( !topic ) {
            callbacks = jQuery.Callbacks();
            topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };
            if ( id ) {
                topics[ id ] = topic;
            }
        }
        return topic;
    };

    $.fn.collapsible = function( options ) {


        return this.each(function() {        
            
            var
            span =  $("<span>")
                .addClass("ori-triangle ori-arrow-down ori-arrow-up")
                .appendTo(this);
                     
            $(this).click(function() {
                $(span).toggleClass('ori-arrow-up'); 
                $(this).next().slideToggle(); 
                return false;
           });
        
        });  
    };
    
    $.fn.inputSlider = function( options ) {
        
        var settings = $.extend( {
          'location'         : 'top',
          'background-color' : 'blue'
        }, options);
            
        return this.each(function() {     
       
            var 
            ele = $(this),
            instance = options.object,
            prop = options.property,
            min = options.min || 0,
            max = options.max || 100,
            toggle = options.toggle || false,
            step = options.step  || 0.2,
            value = options.value ||  instance["get"+prop](),
            sliderElement = $("<div>")
               .addClass('slider'),
            inputElement = $("<input type='text' min="+min+" max="+max+" step="+step+" value='" + value + "'  class='range'/>"),
            changeSlider = options.change || function(event, ui)  { 
                instance["set"+prop](Number(Utils.toDec(ui.value))); 
                inputElement.attr("value", Utils.toDec(ui.value) );
            },
            changeInput = options.change || function()  { 
                instance["set"+prop](Number(Utils.toDec(this.value)));
                sliderElement.slider("value", Number(Utils.toDec(this.value)));
            };

            sliderElement.slider({
                slide: changeSlider,
                range: "min",
                animate: "fast",
                max: max,
                min: min,
                step: step,
                value: value,
                orientation: options.orientation || "horizontal"

            });
            inputElement.bind("change", changeInput);

            ele.append(sliderElement);
            ele.append(inputElement);                       
            
        });     
    };
    
    
}