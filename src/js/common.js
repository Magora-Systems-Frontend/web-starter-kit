$(document).ready( () => {
    let name = $('#InputName');
    let email = $('#InputEmail');
    let message = $('#InputMessage');
    let subject = $('#InputSubject');
    let regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

    $('button').click( (e) => {
        e.preventDefault();

        if (name.val() === '') {
            name.addClass('is-invalid')
        }

        if (email.val() === '') {
            email.addClass('is-invalid')
        } else if (!regexp.test(email.val())) {
            email.addClass('is-invalid');
            email.siblings('.invalid-feedback').css('display','none');
            $('.invalid-email').css('display', 'block');
        }


        if(message.val() === ''){
            message.addClass('is-invalid')
        }

        if(name.val() !== '' && email.val() !== '' && regexp.test(email.val()) && message.val() !== ''){
            let body =
              'Name: ' + name.val() + '\n' +
              'Email: ' + email.val() + '\n' +
              'Subject: ' + subject.val() + '\n' +
              'Message:' + message.val() + '\n';
            console.log(body);
            $.ajax({
                type: "POST",
                url: '/feedback',
                data: JSON.stringify({
                    "body": body,
                }),
                contentType: "application/json; charset=utf-8",
                success: () => {
                    $('form').trigger('reset');
                    $('.success-send').css('display', 'inline-block');
                    setTimeout(() => {
                        $('.success-send').css('display', 'none');
                    }, 3000)
                },
                error: () => {
                    $('.error-send').css('display', 'inline-block');
                    setTimeout(() => {
                        $('.error-send').css('display', 'none');
                    }, 3000)
                }
            });
        }

        return false
    });

    name.focusin(() => {
        name.keyup(() => {
            if (!name.val() === '') {
                name.removeClass('is-invalid')
            }
        })
    });

    email.focusin(() => {
        email.keyup(() => {
            if (!email.val() === '') {
                email.removeClass('is-invalid');
                $('.invalid-email').css('display', 'none');
            }
        })
    });

    message.focusin(() => {
        message.keyup(() => {
            if (!message.val() === '') {
                message.removeClass('is-invalid')
            }
        })
    });

});
