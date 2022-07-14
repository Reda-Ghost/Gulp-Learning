$(document).ready(function(){

  //scroll To element 
  $(".nav-bar a").click(function(e){
    e.preventDefault();
    $(window).scrollTop($("#"+ $(this).data("scroll"))
    .offset().top -= "50");
    
    // add Class Active
    $(".nav-bar a").removeClass("active");
    $(this).addClass("active");
  });

  // calculate Body Margin
  $(".services").css("padding-top",$(".nav-bar").height() + 45);

  // sync content with navbar
  $(window).scroll(function(){
    $(".content").children().each(function(){ 
      if ($(window).scrollTop() >= ($(this).offset().top -= "50")){
        let linkId = $(this).attr("id");
        $(".nav-bar a").removeClass("active");
        $(`.nav-bar a[data-scroll="${linkId}"`).addClass("active");
      }        
    });
  });

  // scroll to top button
  let scrollBtn = $(".scroll-top-btn");
  scrollBtn.click(function(){
    $(window).scrollTop(0);
  })
  
  $(window).scroll(function(){
    if ($(window).scrollTop() > 100 ) {
      if (scrollBtn.is(":hidden")) {
        scrollBtn.fadeIn(400)
      }
    } else {
      scrollBtn.fadeOut(400);
    }
  });

  // popup hide
  $(".pop-up").click(function() {
    $(this).fadeOut(400)
  });
  $(".pop-up .inner").click(function(e) {
    e.stopPropagation()
  });
  $(".pop-up .inner button").click(function(e) {
    e.preventDefault();
    $(this).parents(".pop-up").fadeOut(400)
  });
  $(document).keydown(function (e) { 
    if(e.keyCode == 27) {
      $(".pop-up").fadeOut(400)
    }
  });

  // animated Progress Bar
  $(".progress-bar div").each(function() {
    $(this).delay(900)
    $(this).animate({
      width: $(this).data("progress")
    }, 900 , function() {
      $(this).text($(this).data("progress"))
    })
  });

  // fixed Menu
  $(".fixed-menu").css("left","-" + $(".fixed-menu").width() + "px");
  $(".fixed-menu .show-menu").click(function() {
    $(this).parent().toggleClass("left");
    $(".show-menu i").toggleClass("fa-bars fa-times");
  })

  // change images Thumbnails
  $(".thumbnails img").click(function() {
    $(this).addClass("selected").siblings().removeClass("selected");
    
    $(".master-img img").hide().attr("src" , $(this).attr("src")).fadeIn(200);
  })

  // select prev next image with icon 
  $(".master-img .fa-chevron-left").click(function() {
    if ($(".thumbnails img.selected").is(":first-of-type")) {
      $(".thumbnails img:last-of-type").click();
    }
    else {
      $(".thumbnails img.selected").prev().click();
    }
  });
  $(".master-img .fa-chevron-right").click(function() {
    if ($(".thumbnails img.selected").is(":last-of-type")) {
      $(".thumbnails img:first-of-type").click();
    }
    else {
      $(".thumbnails img.selected").next().click();
    }
  })

  // switch between Grid & list 
  // My Method Bigener
  $(".switch-btn i").click(function() {
    $(this).addClass("active").siblings().removeClass("active");
  })
  $(".fa-list").click(function() {
    $(".products").addClass("list-items").removeClass("grid-vue");
  });
  $(".fa-th-large").click(function() {
    $(".products").addClass("grid-vue").removeClass("list-items");
  });
  // Method advanced
  $(".switch-btn i").click(function(){
    $(".products").removeClass("list-items grid-vue").addClass($(this).data("class"));
    $(this).addClass("active").siblings().removeClass("active");
  }) 

  // Error Message
  $(".error").css("right", "-"+ $(".error").innerWidth() +"px" ).delay(4000).animate({
    right: 0
  }, 500).delay(2000).fadeOut(800);


  // Form Practical Examples
  // hide Placeholder on focus
  var placeVal = "";
  $("[placeholder]").focus(function(){
    placeVal = $(this).attr("placeholder")
    $(this).attr("placeholder" , "");
  }).blur(function(){
    $(this).prop("placeholder" , placeVal)
  });
  var areaTextNode = "";
  $("textarea").focus(function(){
    areaTextNode = $(this).text();
    $(this).text("")
  }).blur(function(){
    $(this).text(areaTextNode);
  });

  // input validation
  $(".form input[placeholder] , .form textarea").blur(function(){
    if($(this).val().length > 5){
      $(this).next().children("i").removeClass("fa-times").addClass("fa-check").css("color","green");
      $(this).next().fadeIn(500).delay(3000).fadeOut(500);
    }else {
      $(this).next().children("i").removeClass("fa-check").addClass("fa-times").css("color","red");
      $(this).next().fadeIn(500).delay(3000).fadeOut(500); 
    }
  });

  // Custom File Input
  $("input[type='file']").each(function() {
    $(this).wrap("<div class='custom-file'></div>")
    $(".custom-file").prepend("<span class='upload-msg'>Upload File</span>")
    $(".custom-file").append("<i class='fa fa-download'></i>");
    $(this).change(function() {
      var valMsg = $(this).val();
      $(".upload-msg").text(valMsg.slice(12));
      $("i.fa-download").removeClass("fa-download").addClass("fa-check");
    })
  })

  // show UniCode on press
  $(".form form").append("<div class='keycode'></div>");
  $(".keycode").css("margin-top","20px");
  $(document).keyup(function(e){
    var btnCode = e.which || e.keyCode;
    $(".keycode").text(btnCode);
  });

  // convert input value to tag
  $(".tag-convert").keyup(function(e) {
    var keyboardKey = e.keyCode || e.which;
    var inputVal = $(this).val()
    if (keyboardKey == 188) {
      var slicedVal = inputVal.slice(0,-1);
      $(".tags-content").append("<div class='tags'> " + slicedVal+ "<i class='fa fa-times'></i></div>");
      $(".tags-content").css({
        marginBottom: "10px",
        textAlign: "start"
      });
      $(".tags").css({
        display: "inline-block",
        padding: "8px 5px 8px 10px",
        width: "max-content",
        background: "white",
        borderRadius: "7px",
        fontSize: "12px",
        margin: "0px 5px",
        marginBottom : "5px"
      }).children(".fa-times").css({
        color:"red",
        fontSize: "12px",
        cursor: "pointer",
        marginLeft: "3px",
        padding: "1px 1px"
      });
      $(this).val("");
      $(".fa-times").click(function(){
        $(this).parent(".tags").fadeOut(500)
      });
    } //end Condition
  });

  // trimmed Text
  /* 
    $(".trim-text p").each(function(){
      if($(this).text().length > 200) {
        slicedTxt = $(this).text().substr(0 , 200);
        $(this).text(slicedTxt + "...");
        console.log($(this).text().length);
      }
    }); 
  */

  // Trim Text General Function
  function trimText(selector , maxChar) {
    $(selector).each(function() {
      if($(this).text().length > maxChar) {
        slicedTxt = $(this).text().substr(0 , maxChar);
        $(this).text(slicedTxt + "...");
      }
    })
  }
  trimText(".trim-text p:first-of-type" , 180)
  trimText(".trim-text p:nth-of-type(2)" , 80)

  // Adjust content Height the same 
  var maxHeight = 0;
  $(".same-height .col").each(function() {
    if ($(this).innerHeight() > maxHeight) { 
      maxHeight = $(this).innerHeight();
    }
  });
  $(".same-height .col").innerHeight(maxHeight);

  // Shuffle Cards
  var z_indexItem = 0
  $(".card").on("click",function(){
    $(this).animate({
      left : "10%"
    },500,function() {
      z_indexItem--;
      $(this).css("z-index", z_indexItem)
    }).animate({
      left : $(this).css("left")
    },500)
  });

  // animate progress Scroll
  $(window).scroll(function(){
    var convertPixel = ($(this).scrollTop() * 100) / 6900;
    $(".progress-scroll span").animate({
      width :  convertPixel + "%"
    },0)
  })

  // animate warning
  function warning(selector) {
    $(selector).fadeOut(900 , function(){
      $(selector).fadeIn(900);
      warning(selector)
    });
  }
  $(".warning").on("click",function(){
    warning(this)
  })

  // todo list app
  $(".input-container form").on("submit" ,function(e){
    if($(this).children("#add-list").val().length > 0){
      e.preventDefault();
      $("<li>"+$("#add-list").val()+"<i class='fa fa-times'></i></li>").appendTo(".list");
      $("#add-list").val("").focus();
    }
  });
  $(".input-container i.fa-chevron-up").click(function() {
    if($("#add-list").val().length > 0){
      $(".list").append("<li>"+$("#add-list").val()+"<i class='fa fa-times'></i></li>");
      $("#add-list").val("").focus();
    }
  });
  $(".list").on("click", "li" , function(){
    $(this).empty().css("height","37px").animate({
      width : "0px",
      padding : 0
    }, 500 , function(){
      $(this).hide().remove();
    })
  });

  // Type Writer Effect
  var dataText = $(".type-writer p").data("text"),
      elementText = $(".type-writer p").text(),
      textLength = dataText.length,
      i = 0;
  $(".type-writer button").one('click' , function(){
    var theType = setInterval(function(){
      $(".type-writer p").text(elementText += dataText[i]);
      i += 1;
      if(i >= textLength) {
        clearInterval(theType);
      }
    }, 200);
  })

  // calculate Total Price
  var theSummery = 0;
  $(".price").each(function() {
    theSummery += parseInt($(this).text());
  })
  $(".total").text(theSummery + "$");

  // auto Change Content
  (function autoChange(){
    $('.auto-change ul li.active').each(function(){
      if(!($(this).is(":last-child"))){
        $(this).delay(2500).fadeOut(500 , function(){
          $(this).removeClass('active').next().addClass('active').fadeIn(500)
          autoChange()
        })
      }
      else{
        $(this).delay(2500).fadeOut(500 , function() {
          $(this).removeClass('active')
          $('.auto-change ul li:first-child').addClass('active').fadeIn(500)
          autoChange()
        });
      }
    })
  })();

  // Dynamic Tabs
  $(".tabs ul li").on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
    $(".tabs-content div." + $(this).data('content')).addClass("active").siblings().removeClass('active')
  })
  // switch left Tabs
  $('.switch-content').on('click',function(){
    $(this).next('.content').toggleClass('left-content')
    $('.tabs').toggleClass('left-tab')
    $('.tabs-content').toggleClass('left-tab-content')
  })
  

});