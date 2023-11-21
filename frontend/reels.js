const download = document.querySelector(".downloader");
const download2 = document.querySelector(".downloader2");
const dropdown = document.querySelector(".dropdown-1");
const dropdown2 = document.querySelector(".dropdown-2");
const hamburger = document.querySelector(".hamburger");
const mobile = document.querySelector(".mobile");

const fetchLinkButton = document.querySelector(".inner-input button");
const urlInputLink = document.querySelector(".inner-input input ");
const pasteBut = document.querySelector(".inner-input .div-cont ");
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

download.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});
download2.addEventListener("click", () => {
  dropdown2.classList.toggle("show");
});

hamburger.addEventListener("click", () => {
  mobile.classList.toggle("review");
});

function downloadFile(url, image) {
  window.open(url, "_blank");
}

fetchLinkButton.addEventListener("click", async () => {
  if (urlInputLink.value === "") {
    // Display an error message for empty input
    noticeMessage.textContent = "Empty! Input URL media link";
    notice.classList.add("show");
    wrapper.classList.add("show");
    return;
  } else {
    const check_url = urlInputLink.value.replace(/ /g, "");
    const re =
      /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!re.test(check_url)) {
      // Display an error message for an invalid URL
      noticeMessage.textContent = "Invalid URL media link";
      notice.classList.add("show");
      wrapper.classList.add("show");
      return;
    } else {
      try {
        loader2.style.display = "none";
        loaderSpan.style.display = "block";
        loader.classList.add("show");
        // Send the user input URL for data retrieval
        await sendUrlTest(urlInputLink.value).then((res) => {
          const data = res.parsedData;
          if (data.error) {
            noticeMessage.textContent = "Check the link, refresh and try again";
            notice.classList.add("show");
            wrapper.classList.add("show");
            throw new Error("Network response was not ok");
          } else {
            // console.log(data);
            loader2.style.display = "block";
            loaderSpan.style.display = "none";
            // innerFileCont.innerHTML = "";
            getReels(data);
          }
        });
      } catch (error) {
        loader.classList.remove("show");
        // console.log(error);
        throw error; // Rethrow the error to be caught in your original code
      }
    }
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

function getReels(data) {
  let jsonData = data;
  let reelURL;
  let reelThumbnail;
  var newArr;
  if (jsonData.graphql) {
    newArr = extractFromArr2(
      jsonData?.graphql?.shortcode_media?.edge_sidecar_to_children?.edges
    );
    // console.log(newArr);
  } else if (jsonData.items) {
    newArr = extractFromArr(jsonData?.items?.[0].carousel_media);
  } else {
  }
  if (newArr) {
    sendReelDetails(newArr, "downloadReel");
  }
}

function extractFromArr(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array of objects");
  }
  const newArray = arr.map((obj) => {
    if (typeof obj === "object" && obj !== null) {
      const { video_versions, image_versions2 } = obj;
      return { video_versions, image_versions2 };
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

const sendReelDetails = (url, route) => {
  loader.classList.add("show");
  // fetch(`https://instagram-downloader.onrender.com/api/${route}`, {
  // fetch(`http://localhost:8088/api/${route}`, {
  fetch(`https://instagram-backend-kcm3.onrender.com/api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoURL: url }),
  })
    .then((response) => {
      loader.classList.remove("show");
      if (response.ok) {
        innerFileCont?.classList.add("show");
        return response.json(); // Return the response data
      } else {
        loader.classList.remove("show");
        // console.log("Upload failed.");
        innerFileCont?.classList.remove("show");
      }
    })
    .then((res) => {
      // console.log(res.uploadedLinks);
      renderFileHTML("", "", res.uploadedLinks);
    })
    .catch((error) => {
      loader.classList.remove("show");
      noticeMessage.textContent = "input the right media link";
      notice.classList.add("show");
      wrapper.classList.add("show");
    });
};

function pasteText(targetInput) {
  navigator.clipboard
    .readText()
    .then((pastedText) => {
      targetInput.value = pastedText;
      targetInput.focus();
    })
    .catch((err) => {});
}

pasteBut.addEventListener("click", (e) => {
  e.preventDefault();
  pasteText(urlInputLink);
});

const sendUrlTest = (url) => {
  // Return the Promise returned by fetch
  // return fetch("http://localhost:8088/api/downloadFile", {
  return fetch("https://instagram-backend-kcm3.onrender.com/api/downloadFile", {
    //   return fetch("https://instagram-downloader.onrender.com/api/downloadFile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  })
    .then((response) => {
      // console.log(response.status);
      if (
        response.status === 403 ||
        response.status === 401 ||
        response.status === 500
      ) {
        noticeMessage.textContent = "Not authenticated, therefore disallowed";
        notice.classList.add("show");
        wrapper.classList.add("show");
        throw new Error("Not authenticated");
      } else if (response.ok) {
        return response.json(); // Return the response data
      } else {
      }
    })
    .catch((error) => {
      noticeMessage.textContent = "Error in retrieval";
      notice.classList.add("show");
      wrapper.classList.add("show");
      throw error; // Rethrow the error to be caught in your original code
    });
};
