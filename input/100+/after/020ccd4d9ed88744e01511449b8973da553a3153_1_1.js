function() {

        // If we are in overview mode and the dock is set to be visible prevent 
        // it to be hidden by window events(window create, workspace change, 
        // window close...)

        if(this._inOverview){
            if( OVERVIEW_MODE !== IntellihideMode.INTELLIHIDE ) {
                return;
            }
        }
        else if( !DOCK_FIXED ) {
            if( INTELLIHIDE ){

                let overlaps = false;

                let windows = global.get_window_actors().filter(this._intellihideFilterInteresting, this);

                for(let i=0; i< windows.length; i++){

                    let win = windows[i].get_meta_window();
                    if(win){
                        let rect = win.get_outer_rect();

                        let test = ( rect.x < this._target.staticBox.x2) &&
                                   ( rect.x +rect.width > this._target.staticBox.x1 ) &&
                                   ( rect.y < this._target.staticBox.y2 ) &&
                                   ( rect.y +rect.height > this._target.staticBox.y1 );

                        if(test){
                            overlaps = true;
                            break;
                        }
                    }
                }

                if(overlaps) {
                    this._hide();
                } else {
                    this._show();
                }
            } else {
                this._hide();
            }
        }
    }