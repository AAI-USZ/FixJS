function populate_names(){
    // www.ssa.gov/oact/babynames/#ht=1
    var seven_to_nine_male = ['Jacob','Michael','Ethan','Joshua','Daniel'];
    var seven_to_nine_female = ['Isabella','Emma','Emily','Olivia','Ava'];

     var temp_male_content = "<ul>";
     for(var i=0; i<5; i++){
        temp_male_content += ("<li>" + seven_to_nine_male[i] + "</li>");
     }
     temp_male_content += "</ul>";
     $('male_name_container_body').innerHTML = temp_male_content;

     var temp_female_content = "<ul>";
     for(var i=0; i<5; i++){
        temp_female_content += ("<li>" + seven_to_nine_female[i] + "</li>");
     }
     temp_female_content += "</ul>";
     $('female_name_container_body').innerHTML = temp_female_content;
}