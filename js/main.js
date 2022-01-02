const mainForm = document.forms.mainForm,
	nameFormInput = mainForm.nameFormInput,
	surnameFormInput = mainForm.surnameFormInput,
	fathersnameFormInput = mainForm.fathersnameFormInput,
	instituteFormInput = mainForm.instituteFormInput,
	courseFormInput = mainForm.courseFormInput,
	formOfStudySelect = mainForm.FormOfStudySelect,
	phoneFormInput = mainForm.phoneFormInput,
	emailFormInput = mainForm.emailFormInput,
	checkboxForm = mainForm.checkboxForm,
	buttonForm = mainForm.buttonForm,
	checkboxContainer = document.getElementById(`checkboxContainer`),
	modal = document.getElementById(`Modal`);

formOfStudySelect.value = ``;

mainForm.addEventListener(`submit`, function (event) {
	event.preventDefault();

	if(!isEmpty(nameFormInput)) {

		if(!isEmpty(surnameFormInput)) {

			if(!isEmpty(fathersnameFormInput)) {

				if(!isEmpty(instituteFormInput)) {

					if(!isEmpty(courseFormInput)) {

						if(!isEmpty(formOfStudySelect)) {

							if(!isEmpty(phoneFormInput)) {

								if(emailTest(emailFormInput)) {

									if(checkboxForm.checked) {
										sendEmail();
										mainForm.reset();
									} else {
										checkboxContainer.classList.add("checkbox-error");
										modal.classList.add("modal-open");
									}

								} else {
									emailFormInput.classList.add("error");
									modal.classList.add("modal-open");
								}
							}
						}
					}
				}
			}
		}
	}
});

eventFocus(nameFormInput);
eventFocus(emailFormInput);
eventFocus(surnameFormInput);
eventFocus(fathersnameFormInput);
eventFocus(instituteFormInput);
eventFocus(courseFormInput);
eventFocus(formOfStudySelect);
eventFocus(phoneFormInput);

checkboxForm.addEventListener(`change`, function (event) {
	let errCheckbox = checkboxContainer.classList.contains("checkbox-error");
	errCheckbox && checkboxContainer.classList.remove("checkbox-error");
});

function isEmpty(item) {
	switch(item){
		case phoneFormInput: 
			if(!item.value) {
				modal.classList.add("modal-open");
				item.classList.add("error");
				return true;
			}
			return false;
			break;
		default:
			if(!item.value || !isNaN(item.value)) {
				modal.classList.add("modal-open");
				item.classList.add("error");
				return true;
			}
			return false;
	}
};

function eventFocus(element) {
	element.addEventListener(`focus`, function (event) {
		hasError(element);
	});
};

function hasError(el) {
	let elError = el.classList.contains("error");
	elError && el.classList.remove("error");

	let modalOpen = modal.classList.contains("modal-open");
	modalOpen && modal.classList.remove("modal-open");
};

function emailTest(email) {
	return !(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value));
};


var Email = {
    send: function (a) {
        return new Promise(function (n, e) {
            (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
            var t = JSON.stringify(a);
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
                n(e);
            });
        });
    },
    ajaxPost: function (e, n, t) {
        var a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            (a.onload = function () {
                var e = a.responseText;
                null != t && t(e);
            }),
            a.send(n);
    },
    ajax: function (e, n) {
        var t = Email.createCORSRequest("GET", e);
        (t.onload = function () {
            var e = t.responseText;
            null != n && n(e);
        }),
            t.send();
    },
    createCORSRequest: function (e, n) {
        var t = new XMLHttpRequest();
        return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest()).open(e, n) : (t = null), t;
    },
};

function sendEmail() {
	Email.send({
		Host: "smtp.gmail.com",
		Username: "vladbashsh@gmail.com",
		Password: "abcd@1234",
		From: "vladbashsh@gmail.com",
		To: "rma@ukrferry.com",
		Subject: "Стипендиальный конкурс",
		Body: `Имя: ${nameFormInput.value}. 
			  Фамилия: ${surnameFormInput.value}. 
			  Отчество: ${fathersnameFormInput.value}. 
			  Название ВУЗа: ${instituteFormInput.value}. 
			  Курс обучения: ${courseFormInput.value}. 
			  Форма обучения: ${formOfStudySelect.value}. 
			  Номер телефона: ${phoneFormInput.value}. 
			  Электронная почта: ${emailFormInput.value}.`
	})
	.then(function (message) {
		alert("Сообщение отправленно!");
	});
}