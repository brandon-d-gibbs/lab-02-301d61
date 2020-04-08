console.log('I am alive!!!');

//Ajax, stop cleaning washing the dishes and fetch me those monsters!
$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
    .then ( (data) => {
        data.forEach( value => {
            new Monster(value).render();
        })


});

//Constructor Function for our Monsters
function Monster(data){
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
}

// Render function for these rascals!
Monster.prototype.render = function() {
    let template = $('#photo-template').html();

    let newSection = $('<section></section>');
    newSection.html(template);
    newSection.find('img').attr('src', this.image_url);
    newSection.find('h2').text(this.title);
    newSection.find('p').text(this.description);
    newSection.attr('keyword', this.keyword);
    newSection.attr('horns', this.horns);

    $('main').append(newSection);
}