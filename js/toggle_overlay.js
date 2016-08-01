/**
 * @file
 * Javascript to create and control the overlay and toggle button.
 */
(function($){

  $(document).ready(function(){
    init_overlay_toggle();
  });

  function init_overlay_toggle(){
    $.getJSON('/toggle_overlays',function(data) {
      var path = window.location.pathname.substr(1);
      var img = '';
      var offset = 0;

      for (var key in data) {
        if (!data.hasOwnProperty(key)) {
          continue;
        }

        var obj = data[key];
        if (obj['rel_path'] == path) {
          img = obj['overlay'];
          if ( !isNaN( obj['offset'] ) && obj['offset'] != '' ) {
            offset = obj['offset'];
          }
        }
      }

      if (img == '') {
        return;
      }

      var toggle_div    = '<div style="position:relative"><div id="page-overlay" style="background-image: url(\'' + img + '\'); background-position: center ' + offset + 'px;"><!-- x --></div></div>',
          toggle_btn    = '<p id="overlay-toggle-btn"><a href="#" class="btn btn-main">Toggle Overlay</a><a href="#" class="btn btn-extra btn-new-window"><i class="fa fa-external-link" title="open in new window"></i></a></p>',
          $page_wrapper = $('body'),
          $page_overlay = $('#page-overlay'),
          $edit_tabs    = $('.block-workbench,section > .tabs'),
          $alert_bar    = $('.alert-block'),
          $msg_bar      = $('.messages');

      $page_wrapper.prepend(toggle_div);
      $page_wrapper.prepend(toggle_btn);

      $('#overlay-toggle-btn .btn-main').click(function(event){
        if($('#page-overlay').hasClass('active')){
          $('#page-overlay').removeClass('active');
          $edit_tabs.removeClass('hide');
          $alert_bar.removeClass('hide');
          $msg_bar.removeClass('hide');
          $('#overlay-toggle-btn').removeClass('active');
        }else{
          $('#page-overlay').addClass('active');
          $edit_tabs.addClass('hide');
          $alert_bar.addClass('hide');
          $msg_bar.addClass('hide');
          $('#overlay-toggle-btn').addClass('active');
        }
        event.preventDefault();
      });

      $('#overlay-toggle-btn .btn-new-window').click(function(event){
        var imgUrl = $('#page-overlay').css('background-image').slice(5, -2);
        window.open(imgUrl, '_blank');
        event.preventDefault();
      });
    });
  }

})(jQuery);
