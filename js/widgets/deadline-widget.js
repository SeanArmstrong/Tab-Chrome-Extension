// Save model changes
$(document).on('click', '.update-deadline-widget', function(){
    Materialize.toast('Value Updated', 1000);
    title = $('#modal' + this.id + ' input')[0].value;
    due_date = $('#modal' + this.id + ' input')[1].value;
    colour1 = $('#modal' + this.id + ' input')[2].value;
    colour2 = $('#modal' + this.id + ' input')[3].value;
    
    $('.gridster #' + this.id)[0].setAttribute('data-title', title);     
    $('.gridster #' + this.id)[0].setAttribute('due_date', due_date);
    $('.gridster #' + this.id)[0].setAttribute('data-colour1', colour1);
    $('.gridster #' + this.id)[0].setAttribute('data-colour2', colour2);

    var time = timeTill(new Date(due_date)).split(' ');
    $('.gridster #' + this.id + ' .deadline-widget-number span').text(time[0]);
    $('.gridster #' + this.id + ' .deadline-widget-interval p').text(time[1]);
    $('.gridster #' + this.id + ' h5').text(title);
    
    // TODO: Check for valid HEX
    $('.gridster #' + this.id + ' .deadline-widget-header').css('background-color', colour1);
    var headerColour = hexToRgb(colour1);
    var stylingWidgetColour = 'rgb(' + parseInt(headerColour.r * 0.75) + ',' + parseInt(headerColour.g * 0.75) + ',' + parseInt(headerColour.b * 0.75) + ')';
    
    $('.gridster #' + this.id + ' .deadline-widget-styling-bar').css('background-color', stylingWidgetColour);
    $('.gridster #' + this.id + ' .deadline-widget-main').css('background-color', colour2);
    
    
    saveGridChanges();
});

$(document).on('mouseover', '.deadline-widget-container', function(){
    $(this).children('.widget-styling-bar')[0].removeAttribute('hidden');
});
$(document).on('mouseleave', '.deadline-widget-container', function(){
    $(this).children('.widget-styling-bar')[0].setAttribute('hidden', 'true');
});
$(document).on('mouseenter', '.deadline-widget-styling-bar', function(){
    $(this)[0].removeAttribute('hidden');
});
$(document).on('mouseleave', '.deadline-widget-styling-bar', function(){
    $(this)[0].setAttribute('hidden', 'true');
});

function addNewDeadlineWidget(){
    gridster.add_widget(getNewDeadlineWidgetHTML("", "", "#f44336", "#ffffff"), 3, 4);
    appendModalToDeadlineWidget("", "", "#f44336", "#ffffff");
    id++;
}

function getNewDeadlineWidgetHTML(title, due_date, colour1, colour2){
    if(due_date == ""){ due_date = new Date(); }
    if(colour1 == "" || colour1 == null){ colour1 = "#f44336"; }
    var time = timeTill(new Date(due_date)).split(' ');
    var headerColour = hexToRgb(colour1);
    var stylingWidgetColour = 'rgb(' + parseInt(headerColour.r * 0.75) + ',' + parseInt(headerColour.g * 0.75) + ',' + parseInt(headerColour.b * 0.75) + ')';
    
    return '<li id=' + id + ' type=3 data-title="' + title + '" due_date="' + due_date + '" data-colour1="' + colour1 + '" data=colour2="' + colour2 + '">' + 
                '<div class="deadline-widget-container widget-container">' +
                    '<div hidden class="deadline-widget-styling-bar widget-styling-bar widget-draggable-element" style="background-color: ' + stylingWidgetColour + '">' +
                        '<div class="right widget-header-options">' +
                             '<a class="btn-flat modal-trigger" href="#modal' + id + '"><i class="mdi-action-settings"></i></a>' +
                             '<a class="btn-flat remove-widget"><i class="mdi-action-highlight-remove"></i></a>' +
                        '</div>' +
                    '</div>' +
                    '<header class="z-depth-1 deadline-widget-header" style="background-color: ' + colour1 + ';">' + 
                        '<div>' +
                            '<h5 class="widget-draggable-element">' + title + '</h5>' +
                        '</div>' +
                    '</header>' + 
                    '<main class="deadline-widget-main" style="background-color: ' + colour2 + '">' +
                            '<div class="deadline-widget-filler"></div>' +
                            '<div class="deadline-widget-intro"><p>Due in</p></div>' +
                            '<div class="deadline-widget-number">' +
                                 '<span>' + time[0] + '</span>' +
                            '</div>' +
                            '<div class="deadline-widget-interval">' + 
                                '<p>' + time[1] + '</p>' +
                            '</div>' +
                    '</main>' + 
                '</div>' +        
            '</li>'
}

function appendModalToDeadlineWidget(title, due_date, colour1, colour2){
        $('.widget-models').append(
           '<div id="modal' + id + '" class="modal">' +
                '<div class="modal-content">' +
                    '<h4>Modal ' + id + ' Header</h4>' +
                    '<div class="row">' +
                        '<form class="col s12">' +
                            '<div class="row">' +
                                '<div class="input-field col s12">' +
                                    '<i class="mdi-social-pages prefix"></i>' +
                                    '<input value="' + title + '" id="icon_prefix" type="text">' +
                                    '<label class="active" for="icon_prefix">Deadline Title</label>' + 
                                '</div>' +
                                '<div class="input-field col s12">' +
                                    '<i class="mdi-social-pages prefix"></i>' +
                                    '<input type="date" value="' + due_date + '" class="datepicker">' + 
                                    '<label class="active" for="icon_prefix">Due Date</label>' + 
                                '</div>' +
                                '<div class="input-field col s12">' +
                                    '<i class="mdi-social-pages prefix"></i>' +
                                    '<input value="' + colour1 + '" id="icon_prefix" type="text" class="validate">' +
                                    '<label class="active" for="icon_prefix">Colour of Header (HEX)</label>' +
                                '</div>' + 
                                '<div class="input-field col s12">' +
                                    '<i class="mdi-social-pages prefix"></i>' +
                                    '<input value="' + colour2 + '" id="icon_prefix" type="text" class="validate">' +
                                    '<label class="active" for="icon_prefix">Colour of Main Body (HEX)</label>' +
                                '</div>' +
                            '</div>' + 
                        '</form>' + 
                    '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                    '<a href="#!" id="' + id + '" class="modal-action modal-close waves-effect waves-green btn-flat update-deadline-widget">Save</a>' +
                '</div>' +
           '</div>');
 
        $('.modal-trigger').leanModal({
            dismissible: false,   
        });
}