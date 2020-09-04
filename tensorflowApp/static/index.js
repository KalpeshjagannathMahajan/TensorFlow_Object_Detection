function detect_objects() {
    var output_image = ''
    var input_image = ''
    var message = ''

    var fd = new FormData();
    var image = document.getElementById('input_image');
    if(image.files.length != 0){
        var files = image.files[0];
        fd.append('image',files);

        $.ajax({
        url: 'detect/',
        type: 'POST',
        data: fd,
        headers: {'X-CSRFToken': csrftoken},
        contentType: false,
        processData: false,
        success: function(response){
            if(response != 0){
                input_image = response['input_image']
                output_image = response['output_image']
                message = response['message']
                if(message){
                    setmessage(message)
                }else{
                    setImages(input_image, output_image)
                }
            }else{
                message = 'Something went wrong'
                setmessage(message)
            }
        },
        });
    }else{
        message = 'Please upload an image'
        var input_image = document.getElementById("input_image");
        image_name_tag.innerHTML = ''
        setmessage(message)
    }    
}

$("#input_image").change(function(){
    var input_image = document.getElementById("input_image");
    var message_tag = document.getElementById("message");
    if(input_image.files.length != 0){
        image_name = input_image.files[0]['name']
        image_name_tag.innerHTML = image_name
        message_tag.style.display = "none";
    }
});

function setmessage(message) {
    var message_tag = document.getElementById("message");
    var upload_image = document.getElementById("upload_image");
    var input_image_tag = document.getElementById("input_image_tag");
    var output_image_tag = document.getElementById("output_image_tag");
    input_image_tag.style.display = 'none'
    output_image_tag.style.display = 'none'
    message_tag.style.display = "block";
    message_tag.innerHTML = message
    upload_image.style.display = "block";
}

function setImages(input_image, output_image){
    var message_tag = document.getElementById("message");
    var upload_image = document.getElementById("upload_image");
    var input_image_tag = document.getElementById("input_image_tag");
    var output_image_tag = document.getElementById("output_image_tag");
    input_image_tag.style.display = 'block'
    input_image_tag.src = '/media/input_images/'+input_image
    output_image_tag.style.display = 'block'
    output_image_tag.src = '/media/output_images/'+output_image
    upload_image.style.display = "none";
    message_tag.style.display = "none";
}