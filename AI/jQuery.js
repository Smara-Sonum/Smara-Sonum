$(document).ready(function() {
    $("form[name='registration']").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function(form) {
            
            var firstName = $("#firstname").val();
            var lastName = $("#lastname").val();
            var email = $("#email").val();
            var password = $("#password").val();
            
            // Do something with the captured values (e.g., display them)
            console.log("First Name: " + firstName);
            console.log("Last Name: " + lastName);
            console.log("Email: " + email);
            console.log("Password: " + password);
            
            // Prevent the actual form submission
            return false;
        }
    });
});
