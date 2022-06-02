window.addEventListener("load", (e) => {
  let currentCapturedImage = window.localStorage.getItem(
    "currentCapturedImage"
  );

  document.querySelector(".main_img").src = currentCapturedImage;
  let galleryImgIcon = document.querySelector(".gallery_img_icon");
  let galleryLogo = document.querySelector(".gallery_logo");

  galleryImgIcon.addEventListener("click", (e) => {
    document.querySelector(".gallery_window").classList.add("active");
  });

  galleryLogo.addEventListener("click", (e) => {
    document.querySelector(".gallery_window").classList.remove("active");
  });

  let getArrayImages = window.localStorage.getItem("images");

  if (getArrayImages != null) {
    let ArrayParse = JSON.parse(getArrayImages);

    ArrayParse.forEach((EachImg, key) => {
      document.querySelector(".images_wrapper").insertAdjacentHTML(
        "beforeend",
        `<div class="img_wrapper"id="image_${key}">
            <img src="./assets/img/close.png" class="close_icon" alt="" />
            <img src="" class="profile_img" />
          </div>`
      );

      document.querySelector(`#image_${key} .profile_img`).src = EachImg;
    });

    document.querySelectorAll(`.close_icon`).forEach((EachImg) => {
      EachImg.addEventListener("click", (e) => {
        let getArrayImages = window.localStorage.getItem("images");

        let ArrayParse = JSON.parse(getArrayImages);
        console.log(ArrayParse);

        let imgSrc = e.target
          .closest(".img_wrapper")
          .querySelector(".profile_img").src;

        let filterarr = ArrayParse.filter((Value) => {
          if (Value != imgSrc) {
            return true;
          }
        });

        let json = JSON.stringify(filterarr);
        window.localStorage.setItem("images", json);
        e.target.closest(".img_wrapper").remove();
      });
    });
  }

  setTimeout(() => {
    window.alert("Bilden har sparats");
  }, 500);
});
