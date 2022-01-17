function populate_names(){
    // www.ssa.gov/oact/babynames/#ht=1
    var seven_to_nine_male = ['Jacob','Michael','Ethan','Joshua','Daniel'];
    var seven_to_nine_female = ['Isabella','Emma','Emily','Olivia','Ava'];

    var three_to_six_male = ['Jacob','Michael','Joshua','Matthew','Ethan'];
    var three_to_six_female = ['Emily','Emma','Madison','Olivia','Hannah'];

    var male_name_set;
    var female_name_set;

    if(current_year === '2007-2009'){
        male_name_set = seven_to_nine_male;
        female_name_set = seven_to_nine_female;
    }else if(current_year === '2003-2006'){
        male_name_set = three_to_six_male;
        female_name_set = three_to_six_female;
    }

    var temp_male_content = "<ul>";
    for(var i=0; i<5; i++){
       temp_male_content += ("<li>" + male_name_set[i] + "</li>");
    }
    temp_male_content += "</ul>";
    $('male_name_container_body').innerHTML = temp_male_content;

    var temp_female_content = "<ul>";
    for(var i=0; i<5; i++){
       temp_female_content += ("<li>" + female_name_set[i] + "</li>");
    }
    temp_female_content += "</ul>";
    $('female_name_container_body').innerHTML = temp_female_content;
}