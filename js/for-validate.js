(function($){
  $.extend($.validator.messages, {
    required: "必須項目です。",
    email: "メールアドレスは正しい形式で入力して下さい。",
    phone: "電話番号は数字で入力して下さい。",
  });

  var methods = {
    phone: function(val, ele){
    return this.optional(ele) || /^0\d{1,4}-\d{1,4}-\d{4}$|^0\d{9,10}$/.test(val);
    }
  };

  $.each(methods, function(key, callback){
    $.validator.addMethod(key, callback);
  });

  $(function(){
    var emptyBgFunc = function(ele){
      var bgVal = ( String( $(ele).val() ) === "" ) ? "#ffcccc" : "#ffffff";
      $(ele).css('background-color', bgVal);
    };
    var makeValidatingCls = function(idx){
      var cls = 'validating' + idx.toString();
      return cls;
    };
    var getValidatingCls = function(ele){
      var cls = $(ele).attr('class').match(/(?:^|[ ])(validating[0-9]+)/);
      cls = (typeof cls === 'object' && typeof cls[1] !== 'undefined') ? cls[1] : '';
      return cls;
    };
    var errHiddenFunc = function(ele){
      var $err = $(ele).next('.error');
      if($err.length){
        $err.css('display', 'none');
      }
    };

    var rules = {}, messages = {}, errTimeouts = {};
    var $inputs = $(".with-validate :input");
    var imeOffTypes = ['email', 'tel'];
    $inputs.each(function(idx){
      $ipt = $(this);
      var type = $ipt.attr('type');
      if( $.inArray(type, imeOffTypes) > -1 ){
        $ipt.css('ime-mode', 'disabled');
      }

      var name = $ipt.attr('name');
      var rule = {};
      switch(type){
        case 'tel':
          rule = { phone: true, required: true };
          message = {
            phone: name + "を入力して下さい。", //電話番号は正しくありません。
            required: name + "を入力して下さい。",
          };
          break;
        default:
          rule = { required: true };
          message = {
            required: name + "を入力して下さい。",
          };
          break;
      }
      rules[name] = rule;
      messages[name] = message;

      var cls = makeValidatingCls(idx);
      $ipt.addClass(cls);
      errTimeouts[cls] = false;

      emptyBgFunc($ipt.get(0));
      $ipt.on('focusout', function(){ emptyBgFunc(this); });
      $ipt.on('focus', function(){
        errHiddenFunc(this);
        var cls = getValidatingCls(this);
        errTimeouts[cls] = false;
      });
    });

    var validator01 = $(".mail-form01").validate({
      rules: rules,
      messages: messages,
      onfocusout: function(ele, event){
        validator01.element(ele);
        var cls = getValidatingCls(ele);
        var timer = setTimeout(function(){
          if(errTimeouts[cls] === timer){
            errHiddenFunc(ele);
          }
        }, 5000);
        errTimeouts[cls] = timer;
      }
    });
    var validator02 = $(".mail-form02").validate({
      rules: rules,
      messages: messages,
      onfocusout: function(ele, event){
        validator.element(ele);
        var cls = getValidatingCls(ele);
        var timer = setTimeout(function(){
          if(errTimeouts[cls] === timer){
            errHiddenFunc(ele);
          }
        }, 5000);
        errTimeouts[cls] = timer;
      },
    });



    /*form-slide*/
    var formFlag01 = false
    $('.form_next').click(function () {
        var flag01 = validator01.element('#form1_1')
        var flag02 = validator01.element('#form1_2')
        var flag03 = validator01.element('#form1_3')
        formFlag01 = flag01 && flag02 && flag03
        /*form01  OK*/ 
        if(formFlag01){
          $('.form-slide').css('transform', 'translateX(-50%)');
        }
    });
    $('.form_back').click(function () {
        $('.form-slide').css('transform', 'translateX(0%)');
    });
    $('.form_submit').click(function () {
        if(validator01.form()){
          $('.mail-form01').submit()
        }else{
          
        }
    });
  });
})(jQuery);
