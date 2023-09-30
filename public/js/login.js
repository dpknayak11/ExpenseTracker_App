const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

const signUpBtn = document.getElementById("signUpBtn");
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

function login() {
  const loginDetails = {
    loginEmail: loginEmail.value,
    loginPassword: loginPassword.value,
  };
  axios.post("/user-login", loginDetails)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('accessToken', token);
      window.location.href = "/get-expense";
    })
    .catch((error) => {
      if (error.response) {
        const errorMessage = error.response.data.message;
        alert(errorMessage);
      } else { alert("An error occurred. Please try again later."); }
    });
}

loginBtn.addEventListener("click", login);

// signUp form data
// singUpForm.addEventListener('submitSingUpForm', (e) => {
//     e.preventDefault();
//     let nameValue = name.value;
//     let emailValue = email.value;
//     let passwordValue = password.value;
//     let data = { name: nameValue, email: emailValue, password: passwordValue };
//     axios.post('/user-signup', data)
//         .then((res) => { alert("user created !") })
//         .catch((err) => { alert(err.message); });
// });

// signIn form data
// singInForm.addEventListener('submitSingInForm', async (e) => {
//     e.preventDefault();
//     let emailValue = email.value;
//     let passwordValue = password.value;
//     let SigninDetails = { email: emailValue, password: passwordValue };
//     try {
//         const res = await axios.post('/user-login', SigninDetails)
//         const token = res.data.token;
//         localStorage.setItem('accessToken', token);
//         if (res.status == 200) {
//             window.location.href = "/get-expense";
//             alert('login done!');
//         }
//         // return (email.value = '', password.value = '')
//         // msg.innerText = err.message;
//     } catch (err) { console.log(err) }
// });

