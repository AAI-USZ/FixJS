function(doc, cdt, cdn) {
  var d = locals[cdt][cdn];
  if(!d.category && d.charge_type){
    alert("Please select Category first");
    d.charge_type = '';
  }  
  else if(d.idx == 1 && (d.charge_type == 'On Previous Row Amount' || d.charge_type == 'On Previous Row Total')){
    alert("You cannot select Charge Type as 'On Previous Row Amount' or 'On Previous Row Total' for first row");
    d.charge_type = '';
  }
  else if((d.category == 'Valuation' || d.category == 'Valuation and Total') && (d.charge_type == 'On Previous Row Amount' || d.charge_type == 'On Previous Row Total')){
    alert("You cannot select charge type as 'On Previous Row Amount' or 'On Previous Row Total' for valuation. You can select only 'Total' option for previous row amount or previous row total")
    d.charge_type = '';
  }
  validated = false;
  refresh_field('charge_type',d.name,'purchase_tax_details');

  cur_frm.cscript.row_id(doc, cdt, cdn);
  cur_frm.cscript.rate(doc, cdt, cdn);
  cur_frm.cscript.tax_amount(doc, cdt, cdn);
}