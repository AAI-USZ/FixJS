function( e ) {
        
            tabl = this.tab.find('a');
            
            if( !this.tab.hasClass('active') )
                tabl.css({'font-weight': 'bold'});
            
            u = channel.client.settings['username'].toLowerCase();
            msg = e['message'].toLowerCase();
            p = channel.window.find('p.logmsg').last();
            
            if( msg.indexOf(u) < 0 || p.html().toLowerCase().indexOf(u) < 0 )
                return;
            
            p.addClass('highlight');
            
            if( this.tab.hasClass('active') )
                return;
            
            console.log(tabl);
            tabl
                .animate( { 'backgroundColor': '#990000' }, 500)
                .animate( { 'backgroundColor': '#EDF8FF' }, 250)
                .animate( { 'backgroundColor': '#990000' }, 250)
                .animate( { 'backgroundColor': '#EDF8FF' }, 250)
                .animate( { 'backgroundColor': '#990000' }, 250)
                .animate( { 'backgroundColor': '#EDF8FF' }, 250)
                .animate( { 'backgroundColor': '#990000' }, 250);
        
        }