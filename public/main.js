const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const loginCheck = user=>{
    if(user){
        loggedInLinks.forEach(link=>{
            link.style.display = "block";
        });
        loggedOutLinks.forEach(link=>{
            link.style.display = "none";
        });
    }else{
        loggedInLinks.forEach(link=>{
            link.style.display = "none";
        });
        loggedOutLinks.forEach(link=>{
            link.style.display = "block";
        });
    }
}

//SignUp
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit",(e)=>{
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;
    auth.createUserWithEmailAndPassword(email,password).then(userCredential =>{
        //clear the form
        signupForm.reset();

        //close the modal
        $('#signupModal').modal('hide');

        console.log("sign up");
    }) 
    e.preventDefault();
});

//SingIn 
const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit",(e)=>{
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;
    auth.signInWithEmailAndPassword(email,password).then(userCredential =>{
        //clear the form
        signInForm.reset();

        //close the modal
        $('#signinModal').modal('hide');

        console.log("sign in");
    })
    e.preventDefault();
});


//LogOut
const logOut = document.querySelector("#logout");

logOut.addEventListener("click",(e)=>{
    auth.signOut().then(()=>{
        console.log("sign out");
    });
    e.preventDefault();
});

//Google Login
const googleButton = document.querySelector("#googlelogin");
googleButton.addEventListener("click",(e)=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result =>{
        console.log("google sign in");
        //clear the form
        signInForm.reset();

        //close the modal
        $('#signinModal').modal('hide');
    })
    .catch(err =>{
        console.log(err);
    })
});

//Facebook Login
const facebookButton = document.querySelector("#facebooklogin");
facebookButton.addEventListener("click",e=>{
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(result =>{
        console.log("facebook sign in");
        //clear the form
        signInForm.reset();

        //close the modal
        $('#signinModal').modal('hide');
    })
    .catch(err =>{
        console.log(err);
    })
});


//Posts
const postList = document.querySelector(".post");
const setupPosts = data => {
    if(data.length){
        let html= '';
        data.forEach(doc => {
            const post = doc.data();
            const li = `
               <li class="list-group-item list-group-item-action">
                    <h5>${post.title}</h5>
                    <p>${post.description}</p>
               </li>
            `;
            html += li;
        });
        postList.innerHTML = html;
    }else{
        postList.innerHTML = `<p class = "text-center">Logueate para ver publicaciones</p>`;
    }
}



//Events
//list for auth state changes
auth.onAuthStateChanged(user=>{
    if(user){
        fs.collection("post").get().then((snapshot)=>{
            setupPosts(snapshot.docs)
            loginCheck(user)
        });
    }else{
        setupPosts([])
        loginCheck(user)
    }
});
