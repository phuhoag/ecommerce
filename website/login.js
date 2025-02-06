const validUsername = "admin";
const validPassword = "123";

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 

   
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

   
    if (username === validUsername && password === validPassword) {
      
        window.location.href = "index.html";
    } else {
       
        alert("Username hoặc password không đúng!");
    }
}); 







function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);

   
    currentValue += change;

   
    if (currentValue < parseInt(quantityInput.min)) {
        currentValue = parseInt(quantityInput.min);
    }

    quantityInput.value = currentValue;
}