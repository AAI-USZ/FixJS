function(tag_obj){
                if(!this.xml_manager){this.xml_manager = this.manager.xml_manager;}
                if(!this.effect_manager){this.effect_manager = this.manager.effect_manager;}
                
                switch(tag_obj.effect){
                case "PieceFrameEffect":
        			var frame = this.xml_manager.replaceVars(this.putInContext(tag_obj.frame));
    				this.effect_manager.add(new PieceFrameEffect(this.objs, frame, game.frame + tag_obj.start_time));
    				break;
    
    			case "OpacityChangeEffect":
    				this.effect_manager.add(new OpacityChangeEffect(this.objs, tag_obj.value, game.frame + tag_obj.start_time));
    				break;
    
    			case "FadeInEffect":
    				this.effect_manager.add(new FadeInEffect(this.objs, game.frame + tag_obj.start_time, game.frame + tag_obj.end_time,
                        tag_obj.rate));
    				break;
    
    			case "FadeOutEffect":
    				this.effect_manager.add(new FadeOutEffect(this.objs, game.frame + tag_obj.start_time, game.frame + tag_obj.end_time,
                        tag_obj.rate));
    				break;
    
    			case "RandomVibrationEffect":
    				this.effect_manager.add(new TimeIndependentVibrationEffect(this.objs[0], this.objs[0].x - tag_obj.amplitude_x
    						, this.objs[0].x + tag_obj.amplitude_x, this.objs[0].y - tag_obj.amplitude_y, this.objs[0].y + tag_obj.amplitude_y
    						, tag_obj.max_rate, game.frame + tag_obj.end_time, game.frame + tag_obj.start_time));
    				break;
			    }
                
                this.manager.setMaxEndTime(tag_obj.end_time || 0);
                return null;
            }