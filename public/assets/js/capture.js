window.addEventListener("load", (e) => {
  let req = new XMLHttpRequest();

  req.open("POST", "https://api.jsonbin.io/v3/b", true);
  req.setRequestHeader("X-Collection-Name", "Images");
  req.setRequestHeader(
    "X-Master-Key",
    "$2b$10$DyG7SWxMLxX0khCea/X9Ye36W6cXsjXacQ/iK.TIHOljjEkD.U0dW"
  );
  req.send();

  let galleryImgIcon = document.querySelector(".gallery_img_icon");
  let gallerylogo = document.querySelector(".gallery_logo");

  galleryImgIcon.addEventListener("click", (e) => {
    document.querySelector(".gallery_window").classList.add("active");
  });

  gallerylogo.addEventListener("click", (e) => {
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
    let captureImg = document.querySelector(".capture_img");
    let video = document.querySelector("#video");
    let canvas = document.querySelector("#canvas");
    let context = canvas.getContext("2d");
    let captureButton = document.querySelector(".footer_area button");

    captureImg.classList.add("active");

    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();
      });
    }

    captureButton.addEventListener("click", (e) => {
      context.drawImage(video, 0, 0, 300, 148);

      let dataurl = canvas.toDataURL("image/png");

      window.localStorage.setItem("currentCapturedImage", dataurl);

      req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          console.log(req.responseText);
        }
      };

      let getArrayImages = window.localStorage.getItem("images");

      if (getArrayImages == null) {
        let array = [dataurl];
        let json = JSON.stringify(array);
        if (window.navigator.onLine) {
          req.open("POST", "https://api.jsonbin.io/v3/b", true);
          req.setRequestHeader(
            "X-Master-Key",
            "$2b$10$DyG7SWxMLxX0khCea/X9Ye36W6cXsjXacQ/iK.TIHOljjEkD.U0dW"
          );
          req.setRequestHeader("Content-Type", "application/json");
          req.send(`{"img": ${json}}`);
        }

        window.localStorage.setItem("images", json);
      } else {
        let ArrayParse = JSON.parse(getArrayImages);
        console.log(ArrayParse);
        let newArray = [dataurl, ...ArrayParse];
        let json = JSON.stringify(newArray);
        window.localStorage.setItem("images", json);

        let obj = {
          img: dataurl,
        };

        let JsonObj = JSON.stringify(obj);

        if (window.navigator.onLine) {
          req.open("POST", "https://api.jsonbin.io/v3/b", true);
          req.setRequestHeader("Content-Type", "application/json");
          req.setRequestHeader("X-Collection-Id", "6298dcc8402a5b38021a1c9b");
          req.setRequestHeader(
            "X-Master-Key",
            "$2b$10$DyG7SWxMLxX0khCea/X9Ye36W6cXsjXacQ/iK.TIHOljjEkD.U0dW"
          );
          req.send(JsonObj);
        }
      }

      setTimeout(() => {
        window.location.href = "./capture.html";
      }, 500);
    });
  }, 500);
});
