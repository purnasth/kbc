function scrollFooter(scrollY, heightFooter) {
  console.log(scrollY);
  console.log(heightFooter);

  if (scrollY >= heightFooter) {
    $("footer").css({
      bottom: "0px",
    });
  } else {
    $("footer").css({
      bottom: "-" + heightFooter + "px",
    });
  }
}

$(window).load(function () {
  var windowHeight = $(window).height(),
    footerHeight = $("footer").height(),
    heightDocument =
      windowHeight + $(".content").height() + $("footer").height() - 20;

  // Defining the size of the element to animate
  $("#scroll-animate, #scroll-animate-main").css({
    height: heightDocument + "px",
  });

  // Defining the size of two header and content elements
  $("header").css({
    height: windowHeight + "px",
    "line-height": windowHeight + "px",
  });

  $(".wrapper-parallax").css({
    "margin-top": windowHeight + "px",
  });

  scrollFooter(window.scrollY, footerHeight);

  // to give scroll
  window.onscroll = function () {
    var scroll = window.scrollY;

    $("#scroll-animate-main").css({
      top: "-" + scroll + "px",
    });

    $("header").css({
      "background-position-y": 50 - (scroll * 100) / heightDocument + "%",
    });

    scrollFooter(scroll, footerHeight);
  };
});

// For Preloader
$(window).load(function () {
  setTimeout(function () {
    $("#preloader").velocity(
      {
        opacity: 0.1,
        translateY: "-80px",
      },
      {
        duration: 400,
        complete: function () {
          $("#hola").velocity(
            {
              translateY: "-100%",
            },
            {
              duration: 1000,
              easing: [0.7, 0, 0.3, 1],
              complete: function () {
                $(".home").addClass("animate-border divide");
              },
            }
          );
        },
      }
    );
  }, 1000);
});

// For kbc-it-club
$(function() {
  $('.intro').addClass('go');

  $('.reload').click(function() {
    $('.intro').removeClass('go').delay(200).queue(function(next) {
      $('.intro').addClass('go');
      next();
    });

  });
})



// For button
$('.button').click(function(){
  var buttonId = $(this).attr('id');
  $('#modal-container').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
})

$('#modal-container').click(function(){
  $(this).addClass('out');
  $('body').removeClass('modal-active');
});