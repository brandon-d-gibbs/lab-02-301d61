'use strict';

let monstersArray = [];
let keywordArray= [];

//Ajax, stop cleaning washing the dishes and fetch me those monsters!
function queryPage(){
    keywordArray = [];
    monstersArray = [];

    $.ajax(`./data/${pageNumber}.json`, {method: 'GET', dataType: 'JSON'})
    .then ( (data) => {
        data.forEach( (value) => {
            new Monster(value).render();            
            if (!keywordArray.includes(value.keyword)){
                keywordArray.push(value.keyword);
            }           
        });
    populateDropDown();    
});
}



//Constructor Function for our Monsters
function Monster(data){
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    monstersArray.push(this);
}

// Render function for these rascals!
Monster.prototype.render = function() {
    let template = $('#photo-template').html();

    let $newSection = $('<section></section>');
    $newSection.html(template);
    $newSection.find('img').attr('src', this.image_url);
    $newSection.find('h2').text(this.title);
    $newSection.find('p').text(this.description);
    $newSection.attr('keyword', this.keyword);
    $newSection.attr('horns', this.horns);

    $('main').append($newSection);
}

// Function to populate drop down menu
function populateDropDown() {
    keywordArray.forEach( (word) => {
        let $options = $('<option></option>');
        $options.text(word);
        $options.val(word);
        $('select').append($options);
    });
}

// Function to sort by keyword
function filterByKeyword(event) {
    const sections = $('section');
    
    sections.each( function (sect, value) {
        if ( $(value).attr('keyword') === event.target.value) {
            $(value).show();
        }else {
            $(value).hide()
        }
    });
}

$('select').change(filterByKeyword);

let pageNumber = 'page-1';

function pageChanger(event) {
    event.preventDefault();
    pageNumber = event.target.value;
    let oldMonster = $('section').not('#photo-template');
    let oldKeyword = $('option');
    $(oldMonster).remove();
    $(oldKeyword).remove();

    queryPage();
}

$('.next').on('click', pageChanger);
queryPage();

// Create @ Master
// chckout a branch... newBranch
// ACP to newBranch on GitHub... merge to master
// Master > working branches