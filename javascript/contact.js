$(document).ready(function () {
    $(document).on("submit", "#contact-form", function (e) {
        e.preventDefault();
        $("#SuccessMSG").html('');
        $("#ErrorMSG").html('');

        $.ajax({
            method: "POST",
            url: "./send_mail.php",
            data: $(this).serialize(),
            success: function (response) {
                var obj = jQuery.parseJSON(response);
                if(obj.success === false) {
                    if(obj.code === "2") {
                        // validation error
                        var errormsghtmlcode2 = '';
                        errormsghtmlcode2 += '<div class="alert alert-danger" role="alert">'+obj.message+'</div>';
                        $("#ErrorMSG").html(errormsghtmlcode2);
                    }
                } else {
                    var successmsghtml = '';
                    successmsghtml += '<div class="alert alert-success" role="alert">'+obj.message+'</div>';
                    $("#SuccessMSG").html(successmsghtml);
                    // $("#contact-form").hide();
                    $('#contact-form')[0].reset();
                }
            },
        });
    });
});