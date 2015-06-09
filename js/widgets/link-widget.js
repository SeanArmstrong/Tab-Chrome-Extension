// Save model changes
$(document).on('click', '.update-link-widget', function(){
    Materialize.toast('Value Updated', 1000)
    linkValue = $('#modal' + this.id + ' input')[0].value
    
    if(linkValue.search('http://') != 0 && linkValue.search('https://') != 0){
        linkValue = 'http://' + linkValue;
    }
    
    logoValue = $('#modal' + this.id + ' input')[1].value
    $('.gridster #' + this.id)[0].setAttribute('feed', linkValue);
    $('.gridster #' + this.id)[0].setAttribute('logo', logoValue);
    $('.gridster #' + this.id + ' img')[0].setAttribute('src', logoValue);
    
    colorWidget(this.id);
    
    saveGridChanges();
});

$(document).on('click', '.link-widget-main', function(){
    var newLocation = this.parentElement.parentElement.getAttribute('feed');
    if(newLocation != ''){
        window.location.href = this.parentElement.parentElement.getAttribute('feed');
    }
});

$(document).on('mouseenter', '.link-widget-main', function(){
    $(this).siblings('.widget-styling-bar')[0].removeAttribute('hidden');
});
$(document).on('mouseleave', '.link-widget-main', function(){
    $(this).siblings('.widget-styling-bar')[0].setAttribute('hidden', 'true');
});
$(document).on('mouseenter', '.link-widget-styling-bar', function(){
    $(this)[0].removeAttribute('hidden');
});
$(document).on('mouseleave', '.link-widget-styling-bar', function(){
    $(this)[0].setAttribute('hidden', 'true');
});

function colorWidget(widgetId){
    var colorThief = new ColorThief();
    
    var color = colorThief.getColor($('.gridster #' + widgetId + ' img')[0]);
    console.log(color);
    var darkerColor = [parseInt(color[0] * 0.75), parseInt(color[1] * 0.75), parseInt(color[2] * 0.75)];
    
    $('.gridster #' + widgetId + ' .link-widget-main').css('background-color', '').css('background-color', 'rgb(' + color.join(',') + ')');
    $('.gridster #' + widgetId + ' .widget-styling-bar')[0].classList.remove('black');
    $('.gridster #' + widgetId + ' .widget-styling-bar').css('background-color', '').css('background-color', 'rgb(' + darkerColor.join(',') + ')');
}


function addNewLinkWidget(){
    gridster.add_widget(getNewLinkWidgetHTML("", ""), 3, 2);
    appendModalToLinkWidget("", "");
    id++;
}

function getNewLinkWidgetHTML(link, logo){
    return '<li id=' + id + ' feed="' + link + '" type=2 logo="' + logo + '">' + 
                '<div class="widget-container">' +
                    '<div hidden class="link-widget-styling-bar widget-styling-bar black widget-draggable-element">' +
                        '<div class="right widget-header-options">' +
                             '<a class="btn-flat modal-trigger" href="#modal' + id + '"><i class="mdi-action-settings"></i></a>' +
                             '<a class="btn-flat remove-widget"><i class="mdi-action-highlight-remove"></i></a>' +
                        '</div>' +
                    '</div>' +
                    '<main class="link-widget-main">' +
                        '<div>' +
                            '<img class="link-widget-logo" src="' + logo + '" crossorigin="anonymous">' +
                        '</div>' +
                    '</main>' + 
                '</div>' +        
            '</li>'
}

function appendModalToLinkWidget(link, logo){
        $('.widget-models').append('<div id="modal' + id + '" class="modal">' +
           '<div class="modal-content">' +
           '<h4>Modal ' + id + ' Header</h4>' +
           '<div class="row">' +
           '<form class="col s12">' +
           '<div class="row">' +
           '<div class="input-field col s12">' +
           '<i class="mdi-social-pages prefix"></i>' +
           '<input value="' + link + '" id="icon_prefix" type="text" class="validate">' +
           '<label class="active" for="icon_prefix">Link</label>' + 
           '</div>' +
           '<div class="input-field col s12">' +
           '<i class="mdi-social-pages prefix"></i>' +
           '<input value="' + logo + '" id="icon_prefix" type="text" class="validate">' +
           '<label class="active" for="icon_prefix">Logo to Display</label>' +
           '</div></div></form></div>' +
           '</div>' +
           '<div class="modal-footer">' +
           '<a href="#!" id="' + id + '" class="modal-action modal-close waves-effect waves-green btn-flat update-link-widget">Save</a>' +
           '</div>' +
           '</div>');
 
        $('.modal-trigger').leanModal({
            dismissible: false,   
        });
}
