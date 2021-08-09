jQuery(document).ready(function($){
  // set viewport
  spView = 'width=375';
  pcView = 'width=1200';
  if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
    $('head').prepend('<meta name="viewport" content="' + spView + ',user-scalable=n">');
  } else {
    $('head').prepend('<meta name="viewport" content="' + pcView + '">');
  }

  //スムーススクロール

  $('a[href^="#"]').click(function(){
    var offset = ($(window).width() <= 767) ? 0 : $('#header').height();
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - offset;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });

  //アコーディオン
  $('.qa_content .q').on('click',function(){
    $(this).toggleClass('open').next().slideToggle();
  });

  //フォームに到達で固定フッター非表示
  var $offset = $('#form').offset();
  $(window).scroll(function () {
    if ($(window).scrollTop() > ($offset.top) - 700) {
      $(".sp_foot").slideUp('fast');
    } else {
      $(".sp_foot").slideDown('fast');
    }
  });

  if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
    $('.voice .voice_content .textarea .txt_in .more_btn').on('click',function(){
      $(this).parent().toggleClass('open');
      $(this).toggleClass('open');
    });
  }

  $('#datepicker').datepicker({
    changeMonth: true,
    duration: 300,
    showAnim: 'show',
    dateFormat: 'yy年mm月dd日',
  });

});


