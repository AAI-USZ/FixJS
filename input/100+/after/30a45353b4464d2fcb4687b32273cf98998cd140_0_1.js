function(args, block) {

        $(this.workspace.el).find(".workspace_results_info").empty();

        if (args.data != null && args.data.error != null) {
            return this.error(args);
        }

        
        // Check to see if there is data
        if (args.data.cellset && args.data.cellset.length === 0) {
            return this.no_results(args);
        }
        
        // Clear the contents of the table
        var runtime = args.data.runtime != null ? (args.data.runtime / 1000).toFixed(2) : "";
        $(this.workspace.el).find(".workspace_results_info")
            .html('<b>Rows:</b> ' + args.data.height + " <b>Columns:</b> " + args.data.width + " <b>Duration:</b> " + runtime + "s");
        $(this.el).html('<tr><td>Rendering ' + args.data.width + ' columns and ' + args.data.height + ' rows...</td></tr>');

        // Render the table without blocking the UI thread
        if (block === true) {
            this.process_data(args.data.cellset);
        } else {
            _.delay(this.process_data, 0, args.data.cellset);
        }

    }