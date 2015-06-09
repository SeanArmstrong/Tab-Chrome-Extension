// Save model changes
$(document).on('click', '.update-feed-widget', function(){
    Materialize.toast('Value Updated', 1000)
    newValue = $('#modal' + this.id + ' input')[0].value
    $('.gridster #' + this.id)[0].setAttribute('feed', newValue);
    saveGridChanges();
    parseRSS(newValue, '.gridster #' + this.id);
});

function addNewFeedWidget(){
    gridster.add_widget(getNewFeedWidgetHTML(""), 3, 2);
    appendModalToFeedWidget("");
    id++;
}

function getNewFeedWidgetHTML(feed){
    return '<li id=' + id + ' feed="' + feed + '" type=1 logo="">' + 
                '<div class="widget-container">' +
                    '<div class="widget-styling-bar blue darken-2 widget-draggable-element">' + 
                        '<div class="right widget-header-options">' +
                             '<a class="btn-flat modal-trigger" href="#modal' + id + '"><i class="mdi-action-settings"></i></a>' +
                             '<a class="btn-flat refresh-widget"><i class="mdi-navigation-refresh"></i></a>' +               
                             '<a class="btn-flat remove-widget"><i class="mdi-action-highlight-remove"></i></a>' +
                        '</div>' +
                    '</div>' +
                    '<header class="widget-header blue widget-draggable-element">' +
                        '<div class="left widget-header-title">' +
                            '<h3 class="widget-draggable-element"></h3>' +
                        '</div>' +
                    '</header>' +
                    '<main class="widget-main">' +
                        '<div>' +
                            '<ol class="collection">' + 
                            '</ol>' + 
                        '</div>' +
                    '</main>' + 
                    '<footer class="widget-footer blue page-footer">' + 
                    '</footer>' +
                '</div>' +        
            '</li>'
}

function appendModalToFeedWidget(feed){
        $('.widget-models').append('<div id="modal' + id + '" class="modal">' +
           '<div class="modal-content">' +
           '<h4>Modal ' + id + ' Header</h4>' +
           '<div class="row">' +
           '<form class="col s12">' +
           '<div class="row">' +
           '<div class="input-field col s12">' +
           '<i class="mdi-social-pages prefix"></i>' +
           '<input value="' + feed + '" id="icon_prefix" type="text" class="validate">' +
           '<label class="active" for="icon_prefix">RSS Feed URL</label>' +
           '</div></div></form></div>' +
           '</div>' +
           '<div class="modal-footer">' +
           '<a href="#!" id="' + id + '" class="modal-action modal-close waves-effect waves-green btn-flat update-feed-widget">Save</a>' +
           '</div>' +
           '</div>');
 
        $('.modal-trigger').leanModal({
            dismissible: false,   
        });
}