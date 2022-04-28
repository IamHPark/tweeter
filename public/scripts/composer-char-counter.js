$(document).ready(function(){
  $("#tweet-text").on('input', function() {
    let wordLength = $(this).val().length;
    let countLength = 140 - wordLength;
    const $counter = $(this).siblings().children("#counter");

    $counter.text(countLength);
    if (countLength < 0) {
      $counter.css({'color' : '#FF0000'})
    } else {
      $counter.css({'color' : 'rgb(110,110,110)'})
    }
  });

  $('.tweet').hover(
    function(){$(this).addClass('shadow')},
    function(){$(this).removeClass('shadow')}
  );
});

