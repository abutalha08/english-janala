console.log("Login functionality coming");

document.getElementById("login-btn").addEventListener("click", function () {
  console.log("login button clicked");
  //1.Get the mobile number input
  const numberInput = document.getElementById("input-mobile-number");
  const contactNumber = numberInput.value;
  console.log(contactNumber);
  //2.Get the pin input
  const inputPin = document.getElementById("input-pin-number");
  const pin = inputPin.value;
  console.log(pin);
  //3.Match pin & mobile number
  if (contactNumber == "01234567890" && pin == "1234") {
    //3-1. true::>> alert > homepage
    alert("Login success");

    // window.location.replace("/homepage.html");
    window.location.assign("/homepage.html");
  } else {
    //3-2. false::>> alert > return
    alert("Login failed");
    return;
  }
});
