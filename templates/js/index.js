$(document).ready(function(){

    $("#detect").click(function(){

        var fd = new FormData();
        var files = $('#input_image')[0].files[0];
        fd.append('file',files);

        $.ajax({
            url: '/detect/',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    $("#img").attr("src",response); 
                    $(".preview img").show(); // Display image element
                }else{
                    alert('file not uploaded');
                }
            },
        });
    });
});