function(o){
                    btn.disabled = false;
                    Lacuna.Pulser.Hide();
                    this.Self.rpcSuccess(o);

                    this.Self.ship_build_queue = o.result;
                    this.Self.ShipyardDisplay();
                    
                    this.Self.ships.docks_available--;
                    if(this.Self.ships.docks_available < 0) {
                        this.Self.ships.docks_available = 0;
                    }
                    this.Self.SetDocksAvailableMessage();
                    this.Self.SetBuildMessage("Successfully started building " + this.Ship.type_human + ".");
                }