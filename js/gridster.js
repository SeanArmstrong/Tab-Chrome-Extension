var id = 0;

$(function(){
    $(".gridster ul").gridster( {
        widget_margins: [10, 10],
        widget_base_dimensions: [140, 140],
        resize: {
            enabled: true,
            min_size: [3, 2],
            stop: function(e, ui, $widget) {
                saveGridChanges();
            }    
        },
        draggable: {
            handle: ".widget-draggable-element",
            ignore_dragging: function (event) {
                return true;
            },
            stop: function(event, ui){
               saveGridChanges(); 
            }
        },
        serialize_params: function ($w, wgd) {              

            return {
                /* add element ID to data*/
                id: $w.attr('id'),
        
                /* add feed link to data*/
                feed: $w.attr('feed'),
                
                /* defaults */
                col: wgd.col,
                row: wgd.row,
                size_x: wgd.size_x,
                size_y: wgd.size_y
            }
        }
    });
    
    chrome.storage.sync.get('layout', function (items){
        $.each(JSON.parse(items.layout), function() {
            gridster.add_widget(getNewWidgetHTML(this.feed), this.size_x, this.size_y, this.col, this.row);
            appendModalToWidget(this.feed);
            parseRSS(this.feed, '.gridster #' + this.id);
            id++;
        });
    });
    
    gridster = $(".gridster ul").gridster().data('gridster');

            
    $('.new-widget').on('click', function(){
        addNewWidget();
        saveGridChanges();
    });
    
    $('.modal-trigger').leanModal({
        dismissible: false,   
    });
    
});

// On document due to race condition
$(document).on('click', '.remove-widget', function(){
    // TODO Not susutainable
    $(this).parent().parent().parent().parent().addClass('active');
    gridster.remove_widget($('.active'));
    saveGridChanges();
});

$(document).on('click', '.update-feed', function(){
    Materialize.toast('Value Updated', 1000)
    newValue = $('#modal' + this.id + ' input')[0].value
    $('.gridster #' + this.id)[0].setAttribute('feed', newValue);
    saveGridChanges();
    parseRSS(newValue, '.gridster #' + this.id);
});

function addNewWidget(){
    gridster.add_widget(getNewWidgetHTML(""), 3, 2);
    appendModalToWidget("");
    id++;
}

function saveGridChanges() {
    data = JSON.stringify(gridster.serialize())
    
    // Check that there's some code there.
    if (!data) {
        message('Error: No data specified');
        return;
    }
    
    var jsonfile = {};
    jsonfile['layout'] = data
    
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set(jsonfile, function() {
        console.log('Layout saved');
    });
}

function getNewWidgetHTML(feed){
    console.log(feed);
    return '<li id=' + id + ' feed=' + feed + '>' + 
                '<div class="widget-container">' +
                    '<div class="widget-styling-bar blue darken-2 widget-draggable-element"></div>' +
                    '<header class="widget-header blue widget-draggable-element">' +
                        '<div class="left widget-header-title">' +
                            '<h3 class="widget-draggable-element"></h3>' +
                        '</div>' +
                        '<div class="right widget-header-options">' +
                         '<a class="btn-flat modal-trigger" href="#modal' + id + '"><i class="mdi-action-settings"></i></a>' +
                         '<a class="btn-flat refresh-widget"><i class="mdi-navigation-refresh"></i></a>' +               
                         '<a class="btn-flat remove-widget"><i class="mdi-action-highlight-remove"></i></a>' +
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

function appendModalToWidget(feed){
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
           '<a href="#!" id="' + id + '" class="modal-action modal-close waves-effect waves-green btn-flat update-feed">Save</a>' +
           '</div>' +
           '</div>');
 
        $('.modal-trigger').leanModal({
            dismissible: false,   
        });
}


