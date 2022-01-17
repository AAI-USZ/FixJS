function(node) {
                  var formattedAmount = OpenSpending.Utils.currencySymbol(node.currency)+' '+node.famount;
                  return [node.label, '<div class="desc">'+(node.description ? node.description : 'No description given')+'</div><div class="amount">'+formattedAmount+'</div>'];
              }