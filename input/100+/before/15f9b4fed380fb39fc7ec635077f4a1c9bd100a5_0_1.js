function() {
	var text = "<select><% todos.each(function(todo){ %><option><%= todo.name %></option><% }) %></select>";
		Todos = new can.Observe.List([
			{id: 1, name: 'Dishes'}
		]),
		compiled = new can.EJS({text: text}).render({todos: Todos}),
		div = document.createElement('div');

		div.appendChild(can.view.frag(compiled))
		equals(div.getElementsByTagName('option').length, 1, '1 item in list')

		Todos.push({id: 2, name: 'Laundry'})
		equals(div.getElementsByTagName('option').length, 2, '2 items in list')

		Todos.splice(0, 2);
		equals(div.getElementsByTagName('option').length, 0, '0 items in list')
}