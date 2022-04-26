$(document).ready(function(){
  $("#tweet-text").on('input', function() {
    let wordLength = $(this).val().length;
    let countLength = 140 - wordLength;
    let counter = this.nextElementSibling.lastElementChild
    counter.innerHTML = countLength;
    if (countLength < 0) {
      $(counter).css({'color' : '#FF0000'})
    } else {
      $(counter).css({'color' : 'black'})
    }
  });

  $('.tweet').hover(
    function(){$(this).addClass('shadow')},
    function(){$(this).removeClass('shadow')}
  );

  $('.icon').hover(
    function(){$(this).css({'color' : 'orange'})},
    function(){$(this).css({'color' : 'rgb(110,110,110)'})}
  )
});

