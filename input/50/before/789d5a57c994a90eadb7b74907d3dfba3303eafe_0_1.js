function(data) {
  return {
    cashboard: {
      invoice: data.uninvoiced_item_cost,
      expenses: data.uninvoiced_expense_cost
    }
  };
}