(function($){
    
    var Placeholder = function(input){
        var placeholder = input.attr("placeholder");
        var label = $("<label />").text(placeholder);
        var parent = input.parent();

        parent.css("position","relative");
        parent.append(label);

        label.css({
            "position":"absolute",
            "cursor": "text",
            "font-size": parseInt(input.css("font-size"),10),
            "top": parseInt(input.css("padding-top"),10) + 3 , 
            "left": parseInt(input.css("padding-left"),10) + 3,
        });

        input.attr("placeholder","");

        label.on("click",function(){
            input.focus();
        });
        input.on("focus",function(){
            if(!input.val()){
                label.hide();
            }
        }).on("blur",function(){
            if(!input.val()){
                label.show();
            }
        })
    }

    $.fn.placeholder = function(){
        this.each(function(i,el){
            Placeholder($(el));
        });
    }

})(jQuery)