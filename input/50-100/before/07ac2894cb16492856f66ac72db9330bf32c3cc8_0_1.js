function(tag_obj){
                if(!this.sound_manager){this.sound_manager = this.manager.sound_manager;}
                if(!this.xml_manager){this.xml_manager = this.manager.xml_manager;}
                this.manager.setMaxEndTime(this.sound_manager.add(this.xml_manager.replaceVars(tag_obj.src)));
                return null;
            }