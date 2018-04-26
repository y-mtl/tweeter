$( document ).ready(function(){

  $('textarea').on('change', function(){
    var textInput = $(this).val();
    //console.log(textInput);
  });
  $('textarea').on('keyup', function(){
    //var count = this.value.length;
    var charCurrent = $(this).val().length;
    var charCount = 0;
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

});