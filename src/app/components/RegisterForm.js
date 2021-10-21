export class RegisterForm {

    validateForm() {

        const options = {
            colorWrong: 'white',
            rules: {
                name: {
                    required: true,
                    minLength: 3
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    phone: true,
                    maxLength: 10
                },
                company: {
                    required: true,
                    minLength: 3
                },
                idea: { required: true },
            },
            messages: {
                name: {
                    required: "Name cannot be blank",
                    minLength: 'Name must need 3 letters'
                },
                email: {
                    required: 'Email cannot be blank.',
                    email: 'Email is not a valid email address.'
                },
                phone: {
                    required: 'Phone cannot be blank.',
                    phone: 'Phone must be number',
                    maxLength: 'Phone max length 10 numbers'
                },
                company: {
                    required: 'Company cannot be blank.',
                    minLength: 'Name must need 3 letters'
                },
                idea: 'Client Idea cannot be blank.'
            },

            submitHandler: function (form, values, ajax) {

                const { name, email, phone, company, idea } = values;
                const userData = { name, email, phone, company, idea };
                // ajax({
                //     url: 'https://just-validate-api.herokuapp.com/submit',
                //     method: 'POST',
                //     data: values,
                //     async: true,
                //     callback: function (response) {
                //         console.log(response)
                //     }
                // });
            },
        };

        // new JustValidate('#Contact', options);
    }
}