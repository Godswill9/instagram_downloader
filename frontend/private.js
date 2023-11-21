const firstInput = document.querySelector(".input-box input");
const val = document.querySelector(".input-box2 .link");
const textArea = document.querySelector("form textarea");

const copyButton = document.querySelector(".input-box2 button");
const secondButton = document.querySelector("form button");

const downloadButton = document.querySelector(
  ".downloadContentSection .file button"
);
const loader = document.querySelector(".downloadContentSection .loader");
const loaderSpan = document.querySelector(
  ".downloadContentSection .loader span"
);
const loader2 = document.querySelector(
  ".downloadContentSection .loader .loader2"
);
const innerFileCont = document.querySelector(".downloadContentSection .inner");
const downloadElem = document.querySelector(".downloadContentSection .file a");

const notice = document.querySelector(".notice");
const noticeMessage = document.querySelector(".notice .message");
const noticeButton = document.querySelector(".notice button");
const wrapper = document.querySelector(".wrapper");

wrapper?.addEventListener("click", () => {
  notice?.classList.remove("show");
  wrapper?.classList.remove("show");
});
noticeButton?.addEventListener("click", () => {
  notice?.classList.remove("show");
  wrapper?.classList.remove("show");
});

function downloadFile(url, image) {
  window.open(url, "_blank");
}

function dynamic_url_maker() {
  let dynamicUrl = firstInput.value;
  const check_url = dynamicUrl.replace(/ /g, "");
  if (check_url === "") {
    return;
  } else {
    const re =
      /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!re.test(check_url)) {
      // show_snackbar(0);
      return "error_link";
    }
    let n = dynamicUrl.split("");
    let dynamic_url = "";
    let slash = 0;
    let i;
    for (i = 0; i < n.length; i++) {
      if (n[i] == "/") {
        slash += 1;
      }
      dynamic_url += n[i];
      if (slash == 5) {
        break;
      }
    }
    dynamicUrl = dynamic_url + "?__a=1&__d=dis";
    return dynamicUrl;
  }
}

firstInput.addEventListener("input", () => {
  var newLink = dynamic_url_maker();
  val.textContent = newLink;
});

const copyLink = (data) => {
  const textarea = document.createElement("textarea");
  textarea.value = data;

  // Hide the textarea from the user
  textarea.style.position = "fixed";
  textarea.style.opacity = 0;

  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("copy");

  document.body.removeChild(textarea);
  window.open(textarea.value, "_blank");
};
copyButton.addEventListener("click", () => {
  copyLink(val.textContent);
});

var fileType = "";
secondButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (textArea.value.trim() === "") {
    noticeMessage.textContent = "Empty input";
    notice.classList.add("show");
    wrapper.classList.add("show");
    return;
  }

  try {
    loader2.style.display = "none";
    loaderSpan.style.display = "block";
    loader.classList.add("show");
    var picture;
    var file;
    var arr;
    const obj = JSON.parse(textArea.value);

    if (!Array.isArray(obj.items) || typeof obj.items[0] !== "object") {
      noticeMessage.textContent = "Check the text, refresh and try again";
      notice.classList.add("show");
      wrapper.classList.add("show");
      loader.classList.remove("show");
      throw new Error("Invalid input format");
    }

    if (obj.items[0].carousel_media) {
      fileType = "reels";
      arr = extractFromArr(obj.items[0].carousel_media);
      sendReelDetails(arr, "downloadReel");
    } else if (!obj.items[0].video_versions) {
      fileType = "image";
      file = obj.items[0]?.image_versions2?.candidates[0]?.url;
      picture = obj.items[0]?.image_versions2?.candidates[0]?.url;
      sendDetailsImages(file, picture, "downloadImg");
    } else if (obj.items[0].video_versions) {
      fileType = "video";
      file = obj.items[0]?.video_versions?.[0]?.url;
      picture = obj.items[0]?.image_versions2?.candidates[0]?.url;
      sendDetailsVideo(file, picture, "downloadVid");
    }

    // console.log(fileType);
  } catch (error) {
    // Handle invalid input format
    noticeMessage.textContent = "Check the text and try again";
    notice.classList.add("show");
    wrapper.classList.add("show");
    loader.classList.remove("show");
  }
});

function renderFileHTML(fileUrl, fileCover, type = "") {
  var fileFormat;

  if (type === "") {
    fileFormat = `
        <div class="file">
          <img src="${fileCover}" alt="" />
          <div class="wrapper">
            <button class="downloadBut" onclick="downloadFile('${fileUrl}', '${fileCover}')">Download</button>
          </div>
        </div>
      `;
  } else {
    fileFormat = type
      .map(
        (item, i) => `
        <div class="file">
          <img src="${item.cloudinaryThumbnailURL}" alt="" />
          <div class="wrapper">
            <button class="downloadBut" onclick="downloadFile('${item.cloudinaryVideoURL}', '${fileCover}')">Download</button>
          </div>
        </div>
      `
      )
      .join("");
  }

  innerFileCont.innerHTML = fileFormat;
}

function extractFromArr(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array of objects");
  }

  const newArray = arr.map((obj) => {
    if (typeof obj === "object" && obj !== null) {
      let videoVersionItem = null;
      let imageVersionsChildren = null;

      if (Array.isArray(obj.video_versions) && obj.video_versions.length >= 2) {
        videoVersionItem = obj.video_versions[1].url || null;
      }

      if (
        typeof obj.image_versions2 === "object" &&
        obj.image_versions2 !== null &&
        Array.isArray(obj.image_versions2.candidates) &&
        obj.image_versions2.candidates.length >= 2
      ) {
        imageVersionsChildren = obj.image_versions2.candidates[1].url || null;
      }

      return {
        video_versions: videoVersionItem,
        image_versions2: imageVersionsChildren,
      };
    } else {
      return {};
    }
  });

  return newArray;
}
function extractFromArr2(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array of objects");
  }
  const newArray = arr.map((obj) => {
    if (typeof obj === "object" && obj !== null) {
      const { video_url, display_url } = obj.node;
      return { video_url, display_url };
    } else {
      return {};
    }
  });

  return newArray;
}

//SENDING THE REQUESTS
const sendReelDetails = (file, route) => {
  //   fetch(`https://instagram-downloader.onrender.com/api/${route}`, {
  // fetch(`http://localhost:8088/api/${route}`, {
  fetch(`https://instagram-backend-kcm3.onrender.com/api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoURL: file }),
  })
    .then((response) => {
      loader2.style.display = "block";
      loaderSpan.style.display = "none";
      loader.classList.remove("show");
      if (response.ok) {
        loader.classList.remove("show");
        innerFileCont?.classList.add("show");
        return response.json(); // Return the response data
      } else {
        loader.classList.remove("show");
        // console.log("Upload failed.");
        innerFileCont?.classList.remove("show");
      }
    })
    .then((res) => {
      //   console.log(res.uploadedLinks);
      renderFileHTML("", "", res.uploadedLinks);
    })
    .catch((error) => {
      loader.classList.remove("show");
      noticeMessage.textContent = "Not a reel. Select reels and re-upload";
      notice.classList.add("show");
      wrapper.classList.add("show");
      console.error(error);
    });
};

const sendDetailsVideo = (url, img, route) => {
  //   fetch(`https://instagram-downloader.onrender.com/api/${route}`, {
  // fetch(`http://localhost:8088/api/${route}`, {
  fetch(`https://instagram-backend-kcm3.onrender.com/api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoURL: url, videoThumbnail: img }),
  })
    .then((response) => {
      loader2.style.display = "block";
      loaderSpan.style.display = "none";
      loader.classList.remove("show");
      if (response.ok) {
        loader.classList.remove("show");
        innerFileCont?.classList.add("show");
        return response.json(); // Return the response data
      } else {
        loader.classList.remove("show");
        // console.log("Upload failed.");
        innerFileCont?.classList.remove("show");
      }
    })
    .then((res) => {
      renderFileHTML(
        res.cloudinaryVideoURL,
        res.cloudinaryVideoThumbnailURL,
        ""
      );
    })
    .catch((error) => {
      loader.classList.remove("show");
      console.error(error);
    });
};
const sendDetailsImages = (url, img, route) => {
  //   fetch(`https://instagram-downloader.onrender.com/api/${route}`, {
  // fetch(`http://localhost:8088/api/${route}`, {
  fetch(`https://instagram-backend-kcm3.onrender.com/api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoURL: url, videoThumbnail: img }),
  })
    .then((response) => {
      loader2.style.display = "block";
      loaderSpan.style.display = "none";
      loader.classList.remove("show");
      if (response.ok) {
        loader.classList.remove("show");
        innerFileCont?.classList.add("show");
        return response.json(); // Return the response data
      } else {
        loader.classList.remove("show");
        // console.log("Upload failed.");
        innerFileCont?.classList.remove("show");
      }
    })
    .then((res) => {
      renderFileHTML(
        res.cloudinaryVideoThumbnailURL,
        res.cloudinaryVideoThumbnailURL,
        ""
      );
    })
    .catch((error) => {
      loader.classList.remove("show");
      console.error(error);
    });
};
