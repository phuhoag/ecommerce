function register(event) {
  event.preventDefault();

  const username = document.querySelector("#usernameLogin").value;
  const password = document.querySelector("#passLogin").value;

  if (!username || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  alert("Đăng ký thành công! Chuyển đến trang đăng nhập...");
  window.location.href = "login.html";
}

function login(event) {
  event.preventDefault();

  const username = document.querySelector("#usernameLogin").value;
  const password = document.querySelector("#passLogin").value;

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    alert("Đăng nhập thành công!");
    window.location.href = "/index.html";
  } else {
    alert("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại!");
  }
}

document
  .getElementById("togglePassword")
  .addEventListener("change", function () {
    const passwordInput = document.getElementById("passLogin");
    passwordInput.type = this.checked ? "text" : "password";
  });
