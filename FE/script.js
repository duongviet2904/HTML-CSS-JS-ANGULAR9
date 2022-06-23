
var fullname = document.getElementById('name');
var username = document.getElementById('username');
var password = document.getElementById('password');
var gender = document.getElementsByName('inlineRadioOptions');
var password_confirmation = document.getElementById('password_confirmation');
var email = document.getElementById('email');
var date = document.getElementById('dateOfBirth');
var phone = document.getElementById('phone');
var address = document.getElementById('address');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	checkInput();
})

function checkInput(){
	var error_found = 0;
	var value_name = fullname.value.trim();
	var value_username = username.value;
	var value_password = document.getElementById('password').value.trim();
	var value_password_confirmation = document.getElementById('password_confirmation').value.trim();
	var value_email = document.getElementById('email').value.trim();
	var value_date = document.getElementById('dateOfBirth').value;
	var value_phone = document.getElementById('phone').value.trim();
	var value_address = document.getElementById('address').value.trim();
	if(value_name === ""){
		setError("name_mes",fullname, "Họ tên không được để trống!");
		error_found++;
	}else if(value_name.length > 200){
		setError("name_mes",fullname, "Họ tên không được vượt quá 200 kí tự!");
		error_found++;
	}else{
		setSucess("name_mes",fullname);
	}

	if(value_username === ""){
		setError("username_mes", username, "Tên đăng nhập không được để trống!");
		error_found++;
	}else if(value_username.length > 200){
		setError("username_mes", username, "Tên đăng nhập không được vượt quá 200 kí tự");
		error_found++;
	}else if(/\s+/.test(value_username)){
		setError("username_mes", username, "Tên đăng nhập không được chứa khoảng trắng!");
		error_found++;
	}else if(/[^a-zA-Z0-9_]+/.test(value_username)){
		setError("username_mes", username, "Tên đăng nhập không được chưa kí tự đặc biệt!");
		error_found++;
	}else{
		setSucess("username_mes",username);
	}

	if(value_password === ""){
		setError("pass_mes",password, "Mật khẩu không được để trống!");
		error_found++;
	}else if(value_password.length > 50 || value_password.length < 6){
		setError("pass_mes",password, "Mật khẩu phải từ 6 đến 50 kí tự!");
		error_found++;
	}else{
		setSucess("pass_mes",password);
	}

	if(value_password_confirmation === ""){
		setError("pass_cfrm_mes",password_confirmation, "Không được để trống!");
		error_found++;
	}else if(value_password_confirmation != value_password){
		setError("pass_cfrm_mes",password_confirmation, "Mật khẩu không trùng khớp!");
		error_found++;
	}else{
		setSucess("pass_cfrm_mes",password_confirmation);
	}

	if(!document.getElementById('r_male').checked && !document.getElementById('r_female').checked && !document.getElementById('r_other').checked){
		setError("gender_mes",gender, "Phải chọn 1!");
		error_found++;
	}else{
		setSucess('gender_mes', gender);
	}

	if(value_email === ""){
		setError("email_mes",email, "Email không được để trống!");
		error_found++;
	}else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value_email)){
		setError("email_mes",email, "Email không đúng định dạng!");
		error_found++;
	}else{
		setSucess('email_mes', email);
	}

	var dateNow = new Date(); 
	// console.log(dateNow);
	var datePick = new Date(value_date);
	// console.log(datePick);
	if(value_date == ""){
		setError("date_mes",date, "Ngày sinh không thể bỏ trống!");
		error_found++;
	}else if(datePick >= dateNow){
		setError("date_mes",date, "Ngày sinh không thể lớn hơn ngày hiện tại!");
		error_found++;
	}else{
		setSucess('date_mes', date);
	}


	if(value_address === ""){
		setError("address_mes",address, "Địa chỉ không được để trống!");
		error_found++;
	}else if(value_address.length > 500){
		setError("address_mes",address, "Địa chỉ không được vượt quá 500 kí tự!");
		error_found++;
	}else{
		setSucess("address_mes",address);
	}

	if(value_phone === ""){
		setError("phone_mes",phone, "Số điện thoại không được để trống!");
		error_found++;
	}else if(!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value_phone)){
		setError("phone_mes",phone, "Số điện thoại không đúng định dạng!");
		error_found++;
	}else{
		setSucess("phone_mes",phone);
	}

	if(error_found == 0){
		alert('Thông tin hợp lệ!');
	}
}

function setError(small, input, message){
	
	document.getElementById(small).className = small + ' error';
	document.getElementById(small).innerText = message;

	input.className= "form-control error";
}

function setSucess(small, input){
	document.getElementById(small).className = small + ' sucess';
	input.className = "form-control sucess";
}