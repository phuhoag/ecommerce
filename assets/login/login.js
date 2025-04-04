function register(event) {
  event.preventDefault();

  const username = document.querySelector("#usernameLogin").value;
  const password = document.querySelector("#passLogin").value;

  if (!username || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.username === username)) {
    alert("Tên người dùng đã tồn tại! Vui lòng chọn tên khác.");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công! Chuyển đến trang đăng nhập...");
  window.location.href = "login.html";
}

function login(event) {
  event.preventDefault();

  const username = document.querySelector("#usernameLogin").value;
  const password = document.querySelector("#passLogin").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
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
