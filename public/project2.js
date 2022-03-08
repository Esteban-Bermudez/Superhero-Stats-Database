function submit() {

    closeSearch()

    let name = $('#characterName').val();
    
    //$("#link").attr("href", `project2.html?search=${name}`);
    //window.location.href = "http://www.w3schools.com/";


    let key = '2964317090451818'

    let url = `https://gateway.marvel.com/v1/public/characters?name=${name}&ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b`

    let url2 = `https://superheroapi.com/api.php/${key}/search/${name}`


    $.get(url2, function(data) {
        //console.log(JSON.stringify(data));
        //$("#raw").html(JSON.stringify(data));
        check(name, data)
        displayResults(data)
    });

}

function check(nameInput, data) {

    if (data.response == "error") {
        $("#layoutContainer1").hide();
        $("#myOverlay").fadeIn(600)
        $("#errorText").html(data.error);
    } else {
        $("#errorText").html("");
        $("#layoutContainer1").show(600);
    }
  
    let nameCap = nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    console.log(nameCap);
    //console.log(data.results.length);
    let listNames = "" 
    let found = "Found: "
 
    for (let i = 0; i < data.results.length; i++) {
        
        listNames += data.results[i].name+ "  "
        

        if (nameCap==data.results[i].name) {
            
            found += data.results[i].name + `[${i}]` + ` `
            let temp = data.results[0]
            data.results[0] = data.results[i]
            data.results[i] = temp
            break;
        }
        
    }
    console.log(listNames);
    console.log(found);
    console.log(data.results[0]);


  }

function displayResults(data) {
  


    
    $('.titleName').html("<h1>" + data.results[0].name + "</h1>")

    $(".characterImage").attr("src", data.results[0].image.url);
    console.log(data.results[0].powerstats);
    displayStats(data)
    displayInfo(data)

    if (data.results[0].biography.publisher == "Marvel Comics") {
        $(".publisherLogo").attr("src", "Marvel_Logo.svg.png");
    } else if (data.results[0].biography.publisher == "DC Comics") {
        $(".publisherLogo").attr("src", "DC-Comics-Logo.png");
    }
}

function displayStats(data) {
    let pStats = data.results[0].powerstats
    $(".Intelligence").html(pStats.intelligence);
    $(".Strength").html(pStats.strength);
    $(".Speed").html(pStats.speed);
    $(".Combat").html(`${pStats.combat}`);
    $(".Power").html(`${pStats.power}`);
    $(".Durability").html(`${pStats.durability}`);
}

function displayInfo(data) {
    $(".realName").html("REAL NAME: ");
    $(".realName").append(data.results[0].biography["full-name"]);
    $(".aliases").html("ALIASES: ");
    let aliases = data.results[0].biography.aliases
    let aliasesCount = aliases.length

    if (aliasesCount >= 5) {
        aliasesCount = 5
    }

    for (let i = 0; i < aliasesCount; i++) {
        if (i != aliases.length - 1) {
            $(".aliases").append(aliases[i] + ", ");
        } else {
            $(".aliases").append(aliases[i]);
        }
    }
    $(".firstAppearance").html("FIRST APPEARANCE: ").append(data.results[0].biography["first-appearance"]);
    $(".occupation").html("OCCUPATION: ").append(data.results[0].work.occupation);
    $(".base").html("LOCATION: ").append(data.results[0].work.base);

    $(".groupAffiliation").html("GROUP AFFILIATION: ").append(data.results[0].connections["group-affiliation"])


}

$(document).ready(function() {

    $("#myOverlay").show();

});

function openSearch() {
    
    $("#myOverlay").fadeIn(600)
    $(".closebtn").show();
    $(".openBtn").hide();
}

function closeSearch() {
    
    $("#myOverlay").delay(400).hide()
    $(".openBtn").show();
}