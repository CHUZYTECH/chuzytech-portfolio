// Code For Clear Form Submition

  document.getElementById("contactform").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert("Message sent successfully!");
        form.reset(); // Clear the form inputs
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    })
    .catch(error => {
      alert("Error: Could not send message.");
      console.error(error);
    });

  });

  document.getElementById("contactform").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      alert("Thank you! Your message has been sent.");
      form.reset();
    } else {
      alert("Oops! Something went wrong.");
    }
  });
});

  // X in Toggle bar
  
  const toggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarNav');
  const navLinks = document.querySelectorAll('.nav-link');

  toggler.addEventListener('click', () => {
    toggler.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        toggler.click(); // Trigger toggle to close menu
      }
    });
  });

// 

function exitLogin() {
    // Clear inputs and hide error
    adminUser.value = "";
    adminPass.value = "";
    loginError.classList.add("d-none");
    // Hide the modal
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
}

 
 
