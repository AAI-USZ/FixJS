function() {
                var current = this.get();
                if(current == null) {
                    current = step.defaults.detailLevel;
                }
                
                step.menu.tickMenuItem($("li[menu-name = 'VIEW'] ul li a").get(current));
            }