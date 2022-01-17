function(doc, cdt, cdn) {
  var d = locals[cdt][cdn];
  if(!d.category && d.add_deduct_tax){
    alert("Please select Category first");
    d.add_deduct_tax = '';
  }
  else if(d.category != 'Total' && d.add_deduct_tax == 'Deduct'){
    alert("You cannot Deduct when category is for valuation or for both(i.e total and valuation)");
    d.add_deduct_tax = '';
  }

}