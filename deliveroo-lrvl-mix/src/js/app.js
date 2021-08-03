//variables
let pageIsLoaded = false;
let selector = null;

//event Listenners
document.addEventListener("DOMContentLoaded", () => {
  pageIsLoaded = true;
  const form = document.querySelector(".contact_form");
  form.setAttribute("novalidate", "");
  addEvent();
});

//functions

function addEvent() {
  selector = document.querySelector(".header_select");
  selector.addEventListener("click", () => {
    let menu = document.querySelector(".onClickMenu");
    menu.classList.toggle("onClickMenuVisible");
  });
  const email = document.querySelector("#mail");
  const name = document.querySelector("#name");
  const firstname = document.querySelector("#firstname");
  const message = document.querySelector(".message");
  const submit = document.querySelector(".form_send");

  function checkValid() {
    const error = document.querySelector(".errorMail");
    error.textContent = "";
    if (!email.validity.valid) {
      email.classList.add("invalid");
      const errorMsg =
        "Vérifiez que votre email, est bien une adresse correcte.";
      error.textContent = errorMsg;
      email.classList.add("invalid");
    } else {
      email.classList.remove("invalid");
    }
  }

  const values = {
    emailLght: email,
    nameLght: name,
    firstnameLght: firstname,
    messageLght: message,
  };

  let lenghtArray = [];

  function checkEmpty() {
    Object.keys(values).forEach((element) => {
      console.log(values[element].value.length);
      if (values[element].value.length == 0) {
        values[element].classList.add("invalid");
        let sib = values[element].nextSibling.nextSibling; //i don't know why i need to nextSibling side to side to obtain the good result. But it works
        sib.textContent = "";
        sib.textContent = "Ce champ ne peut pas être vide.";
        lenghtArray.push(values[element].value.length); //si l'élément est égal a zero je le met dans le tableau
      } else {
        values[element].classList.remove("invalid");
      }
    });
    console.log("array", lenghtArray.length);
    if (lenghtArray.length > 0) {
      submit.disabled = true;
    } else {
      submit.disabled = false;
    }
  }

  Object.keys(values).forEach((element) => {
    values[element].addEventListener(
      "focusout",
      (e) => {
        if (values[element].value.length == 0) {
          values[element].classList.add("invalid");
          let sib = values[element].nextSibling.nextSibling; //i don't know why i need to nextSibling side to side to obtain the good result. But it works

          sib.textContent = "";
          sib.textContent = "Ce champ ne peut pas être vide.";
          // console.log(values[element].value.lenght);
          values[element].addEventListener(
            "focusout",
            (e) => {
              if (!values[element].value.length == 0) {
                sib.textContent = "";
                values[element].classList.remove("invalid");
                if (values[element].type == "email") {
                  checkValid();
                }
              }
            },
            false
          );
        } else {
          values[element].classList.remove("invalid");
        }
      },
      false
    );
  });

  submit.addEventListener(
    "click",
    (e) => {
      checkEmpty();
    },
    true
  );
}
