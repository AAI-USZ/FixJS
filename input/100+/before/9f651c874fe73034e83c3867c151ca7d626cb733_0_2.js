function storeData() {
        var id = Math.floor(Math.random()*10000001);
        //Gathering all form values, storing into an object
        // Object contains array with the form label and input value
        getSelectedRadio();
        var item= {};
            item.choretype = ["Chore Type:", a('choretype').value];
            item.chorename = ["Chore Name:", a('chorename').value];
            item.urgency   = ["Is this chore Urgent?:", urgencyValue];
            item.difficulty= ["Difficulty:", a('difficulty').value];
            item.finishby  = ["Finish By:", a("finishby").value];
            item.chorenotes= ["Chore Notes:", a('chorenotes').value];
            
        // Save data to local storage, use Stringify to convert object to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Chore Saved!");
            
    }