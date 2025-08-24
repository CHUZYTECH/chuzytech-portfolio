$(document).ready(function () {
   // Code to see potfolio

   $(".see-portfolio").click(function () {
    $(".slide").slideToggle();

});

});

// Code for Year

document.getElementById("year").textContent = new Date().getFullYear();

// Local Date & Time Script (No Seconds)

  function updateLocalDate() {
    const dateElement = document.getElementById("local-date");
    const now = new Date();

    const weekday = now.toLocaleString(undefined, { weekday: 'long' });
    const month = now.toLocaleString(undefined, { month: 'long' });
    const day = now.getDate();
    const time = now.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    dateElement.textContent = `${weekday}, ${month} ${day} ${time}`; 
  }

  updateLocalDate(); // Run on load
  setInterval(updateLocalDate, 60000); // Update every minute


