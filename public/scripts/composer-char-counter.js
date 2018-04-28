$( document ).ready(function(){

  $('textarea').on('change', function(){
    const textInput = $(this).val();
  });
  $('textarea').on('keyup', function(){
    //var count = this.value.length;
    const charCurrent = $(this).val().length;
    let charCount = 0;
    if( 140 - charCurrent >= 0 ) {
      charCount = 140 - charCurrent;
      $(this).siblings('span.counter').removeClass('exceed');
    } else {
      charCount = -(charCurrent - 140);
      $(this).siblings('span.counter').addClass('exceed');
    }
    $(this).siblings('span.counter').text(charCount);
  });

  $('nav a.btn-edit').on('click', function(){
    $('main .new-tweet').slideToggle('slow');
    $('main .new-tweet textarea').focus();
  });

  // hover effect for social icons
  // added 'document' since the article is dynamically added by js.
  $(document).on('mouseenter', '#tweets-container article', function(){
      $(this).addClass('icons-on');
    }).on('mouseleave', '#tweets-container article', function() {
      $(this).removeClass('icons-on');
  });

});