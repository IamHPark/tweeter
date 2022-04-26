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
  })
});

