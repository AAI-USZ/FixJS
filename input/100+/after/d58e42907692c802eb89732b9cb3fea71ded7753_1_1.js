function(Comp) {
                    var value = _.extend({span : span, parent: self});
                    var obj = { } ;
                    
                    obj =  new Comp(value);
										obj.render();
										
                    if (align == 'first') {
                        self.firstComp(obj);
                    } else if (align == 'last'){
                        self.lastComp(obj);
                    }
                    
                    obj.show(true);
                    
                    $("html,body").animate({scrollTop: obj.$el.offset().top+30});
                    
                    setTimeout(function() { self.save(); }, 1000);
                        
              }