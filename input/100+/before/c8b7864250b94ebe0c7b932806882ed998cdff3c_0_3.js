function buildNode($node, $appendTo, level, opts) {
    var $table = $("<table cellpadding='0' cellspacing='0' border='0'/>");
    var $tbody = $("<tbody/>");

    // Construct the node container(s)
    var $nodeRow = $("<tr/>").addClass("node-cells");
    var $nodeCell = $("<td/>").addClass("node-cell").attr("colspan", 2);
    var $childNodes = $node.children("ul:first").children("li");
    var $nodeDiv;
    
    if($childNodes.length > 1) {
      $nodeCell.attr("colspan", $childNodes.length * 2);
    }
    // Draw the node
    // Get the contents - any markup except li and ul allowed
    var $nodeContent = $node.clone()
                            .children("ul,li")
                            .remove()
                            .end()
                            .html();
	
    //Increaments the node count which is used to link the source list and the org chart
	nodeCount++;
	$node.data("tree-node", nodeCount);
	$nodeDiv = $("<div>").addClass("node")
                                   .data("tree-node", nodeCount)
                                   .append($nodeContent);

    // Expand and contract nodes
    if ($childNodes.length > 0) {
      $nodeDiv.click(function() {
          var $this = $(this);
          var $tr = $this.closest("tr");

          if($tr.hasClass('contracted')){
            $this.css('cursor','n-resize');
            $tr.removeClass('contracted').addClass('expanded');
            $tr.nextAll("tr").css('visibility', '');
          }else{
            $this.css('cursor','s-resize');
            $tr.removeClass('expanded').addClass('contracted');
            $tr.nextAll("tr").css('visibility', 'hidden');
          }
        });
    }
    
    $nodeCell.append($nodeDiv);
    $nodeRow.append($nodeCell);
    $tbody.append($nodeRow);

    if($childNodes.length > 0) {
      // if it can be expanded then change the cursor
      $nodeDiv.css('cursor','n-resize').addClass('expanded');
    
      // recurse until leaves found (-1) or to the level specified
      if(opts.depth == -1 || (level+1 < opts.depth)) { 
        var $downLineRow = $("<tr/>");
        var $downLineCell = $("<td/>").attr("colspan", $childNodes.length*2);
        $downLineRow.append($downLineCell);
        
        // draw the connecting line from the parent node to the horizontal line 
        $downLine = $("<div></div>").addClass("line down");
        $downLineCell.append($downLine);
        $tbody.append($downLineRow);

        // Draw the horizontal lines
        var $linesRow = $("<tr/>");
        $childNodes.each(function() {
          var $left = $("<td>&nbsp;</td>").addClass("line left top");
          var $right = $("<td>&nbsp;</td>").addClass("line right top");
          $linesRow.append($left).append($right);
        });

        // horizontal line shouldn't extend beyond the first and last child branches
        $linesRow.find("td:first")
                    .removeClass("top")
                 .end()
                 .find("td:last")
                    .removeClass("top");

        $tbody.append($linesRow);
        var $childNodesRow = $("<tr/>");
        $childNodes.each(function() {
           var $td = $("<td class='node-container'/>");
           $td.attr("colspan", 2);
           // recurse through children lists and items
           buildNode($(this), $td, level+1, opts);
           $childNodesRow.append($td);
        });

      }
      $tbody.append($childNodesRow);
    }

    // any classes on the LI element get copied to the relevant node in the tree
    // apart from the special 'collapsed' class, which collapses the sub-tree at this point
    if ($node.attr('class') != undefined) {
        var classList = $node.attr('class').split(/\s+/);
        $.each(classList, function(index,item) {
            if (item == 'collapsed') {
                $nodeRow.nextAll('tr').css('display', 'none');
                    $nodeRow.removeClass('expanded');
                    $nodeRow.addClass('contracted');
                    $nodeDiv.css('cursor','s-resize');
            } else {
                $nodeDiv.addClass(item);
            }
        });
    }

    $table.append($tbody);
    $appendTo.append($table);
    
    /* Prevent trees collapsing if a link inside a node is clicked */
    $nodeDiv.children('a').click(function(e){
        console.log(e);
        e.stopPropagation();
    });
  }