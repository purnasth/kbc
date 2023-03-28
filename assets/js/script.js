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
$(function () {
  $(".intro").addClass("go");

  $(".reload").click(function () {
    $(".intro")
      .removeClass("go")
      .delay(200)
      .queue(function (next) {
        $(".intro").addClass("go");
        next();
      });
  });
});

// For button
$(".button").click(function () {
  var buttonId = $(this).attr("id");
  $("#modal-container").removeAttr("class").addClass(buttonId);
  $("body").addClass("modal-active");
});

$("#modal-container").click(function () {
  $(this).addClass("out");
  $("body").removeClass("modal-active");
});

/*--------------------------------------------------------------
# Gallery
--------------------------------------------------------------*/
$(document).ready(function () {
  var itemSelector = ".grid-item";

  var $container = $("#container").isotope({
    itemSelector: itemSelector,
    masonry: {
      columnWidth: itemSelector,
      isFitWidth: true,
    },
  });

  //Ascending order
  var responsiveIsotope = [
    [480, 7],
    [720, 10],
  ];

  var itemsPerPageDefault = 12;
  var itemsPerPage = defineItemsPerPage();
  var currentNumberPages = 1;
  var currentPage = 1;
  var currentFilter = "*";
  var filterAtribute = "data-filter";
  var pageAtribute = "data-page";
  var pagerClass = "isotope-pager";

  function changeFilter(selector) {
    $container.isotope({
      filter: selector,
    });
  }

  function goToPage(n) {
    currentPage = n;

    var selector = itemSelector;
    selector +=
      currentFilter != "*"
        ? "[" + filterAtribute + '="' + currentFilter + '"]'
        : "";
    selector += "[" + pageAtribute + '="' + currentPage + '"]';

    changeFilter(selector);
  }

  function defineItemsPerPage() {
    var pages = itemsPerPageDefault;

    for (var i = 0; i < responsiveIsotope.length; i++) {
      if ($(window).width() <= responsiveIsotope[i][0]) {
        pages = responsiveIsotope[i][1];
        break;
      }
    }

    return pages;
  }

  function setPagination() {
    var SettingsPagesOnItems = (function () {
      var itemsLength = $container.children(itemSelector).length;

      var pages = Math.ceil(itemsLength / itemsPerPage);
      var item = 1;
      var page = 1;
      var selector = itemSelector;
      selector +=
        currentFilter != "*"
          ? "[" + filterAtribute + '="' + currentFilter + '"]'
          : "";

      $container.children(selector).each(function () {
        if (item > itemsPerPage) {
          page++;
          item = 1;
        }
        $(this).attr(pageAtribute, page);
        item++;
      });

      currentNumberPages = page;
    })();

    var CreatePagers = (function () {
      var $isotopePager =
        $("." + pagerClass).length == 0
          ? $('<div class="' + pagerClass + '"></div>')
          : $("." + pagerClass);

      $isotopePager.html("");

      for (var i = 0; i < currentNumberPages; i++) {
        var $pager = $(
          '<a href="javascript:void(0);" class="pager" ' +
            pageAtribute +
            '="' +
            (i + 1) +
            '"></a>'
        );
        $pager.html(i + 1);

        $pager.click(function () {
          var page = $(this).eq(0).attr(pageAtribute);
          goToPage(page);
        });

        $pager.appendTo($isotopePager);
      }

      $container.after($isotopePager);
    })();
  }

  setPagination();
  goToPage(1);

  //Adicionando Event de Click para as categorias
  $(".filters a").click(function () {
    var filter = $(this).attr(filterAtribute);
    currentFilter = filter;

    setPagination();
    goToPage(1);
  });

  //Evento Responsivo
  $(window).resize(function () {
    itemsPerPage = defineItemsPerPage();
    setPagination();
  });
});

$(document).ready(function () {
  // filter items on button click
  $(".filter-button-group").on("click", "li", function () {
    var filterValue = $(this).attr("data-filter");
    $(".grid").isotope({ filter: filterValue });
    $(".filter-button-group li").removeClass("active");
    $(this).addClass("active");
  });
});

$(document).ready(function () {
  // filter items on button click
  $(".isotope-pager").on("click", "a", function () {
    var filterValue = $(this).attr("data-page");

    $(".isotope-pager a").removeClass("active");
    $(this).addClass("active");
  });
});

$(document).ready(function () {
  $(".popupimg").magnificPopup({
    type: "image",
    mainClass: "mfp-with-zoom",
    gallery: {
      enabled: true,
    },

    zoom: {
      enabled: true,

      duration: 300, // duration of the effect, in milliseconds
      easing: "ease-in-out", // CSS transition easing function

      opener: function (openerElement) {
        return openerElement.is("img")
          ? openerElement
          : openerElement.find("img");
      },
    },
  });
});






let title = document.getElementById("text-title");

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  title.style.marginTop = value * 1 + "px";
  // title.style.left = value * -1.5 + "px";

});

console.log(
  "I have a problem with the code above. I want to make the leaf move to the right and the tree move to the left. But when I add the code for the tree, the leaf stops moving to the right. I don't know why. Can someone help me?"
);
