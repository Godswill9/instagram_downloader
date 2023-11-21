const download = document.querySelector(".downloader");
const download2 = document.querySelector(".downloader2");
const dropdown = document.querySelector(".dropdown-1");
const dropdown2 = document.querySelector(".dropdown-2");
const hamburger = document.querySelector(".hamburger");
const mobile = document.querySelector(".mobile");
const video = document.querySelector(".video");
const photo = document.querySelector(".photo");
const reel = document.querySelector(".reel");
const stories = document.querySelector(".stories");
const igtv = document.querySelector(".igtv");
const Instagramdownloader = document.querySelector(".Instagram-downloader");
const InstagramPhoto = document.querySelector(".Instagram-Photo");
const InstagramReels = document.querySelector(".Instagram-Reels");
const Instagramstory = document.querySelector(".Instagram-story");
const IGTVvideo = document.querySelector(".IGTV-video");
console.log(download, dropdown);
localStorage.setItem("title", "video");
var title = localStorage.getItem("title");

function setTitle(str) {
  localStorage.setItem("title", str);
  // alert(`you can now download ${str}`);
  // location.reload();
}
download.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});
download2.addEventListener("click", () => {
  dropdown2.classList.toggle("show");
});

hamburger.addEventListener("click", () => {
  mobile.classList.toggle("review");
});

video.addEventListener("click", () => {
  Instagramdownloader.style.display = "block";
  InstagramPhoto.style.display = "none";
  InstagramReels.style.display = "none";
  Instagramstory.style.display = "none";
  IGTVvideo.style.display = "none";
  innerFileCont?.classList.remove("show");
  setTitle("video");
});
photo.addEventListener("click", () => {
  InstagramPhoto.style.display = "block";
  Instagramdownloader.style.display = "none";
  InstagramReels.style.display = "none";
  Instagramstory.style.display = "none";
  IGTVvideo.style.display = "none";
  innerFileCont?.classList.remove("show");
  setTitle("images");
});

reel.addEventListener("click", () => {
  InstagramReels.style.display = "block";
  InstagramPhoto.style.display = "none";
  Instagramdownloader.style.display = "none";
  Instagramstory.style.display = "none";
  IGTVvideo.style.display = "none";
  innerFileCont?.classList.remove("show");
  setTitle("reels");
});
stories.addEventListener("click", () => {
  Instagramstory.style.display = "block";
  InstagramPhoto.style.display = "none";
  Instagramdownloader.style.display = "none";
  InstagramReels.style.display = "none";
  IGTVvideo.style.display = "none";
  innerFileCont?.classList.remove("show");
  setTitle("story");
});
igtv.addEventListener("click", () => {
  IGTVvideo.style.display = "block";
  InstagramPhoto.style.display = "none";
  Instagramdownloader.style.display = "none";
  InstagramReels.style.display = "none";
  Instagramstory.style.display = "none";
  innerFileCont?.classList.remove("show");
  setTitle("igtv");
});

//CODE FOR DOWNLOADING THE INSTAGRAM VIDEO
const fetchLinkButton = document.querySelector(".inner-input button");
const urlInputLink = document.querySelector(".inner-input input ");
const pasteBut1 = document.querySelector(".inner-input .div-cont ");

const getLink = "";
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
  // setTimeout(() => {
  //   finishUp(url, image);
  // }, 200000);
}
// function downloadFile(url, image) {
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "download";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   setTimeout(() => {
//     finishUp(url, image);
//   }, 10000);
// }

// function open_json(url) {
//   sendUrlTest(url);
// }
// fetchLinkButton.addEventListener("click", () => {
//   if (urlInputLink.value == "") {
//     noticeMessage.textContent = "Empty! Input URL media link";
//     notice.classList.add("show");
//     wrapper.classList.add("show");
//     return;
//   } else {
//     loader.classList.add("show");
//     const payload = {
//       via: "form",
//       ref: "download-audio-instagram",
//       url: urlInputLink.value,
//     };

//     // Convert the payload to a URL-encoded string
//     const formData = new URLSearchParams(payload).toString();

//     // Make a request to your Node.js server
//     fetch("http://localhost:8088/api/instagram", {
//       method: "POST",
//       body: formData,
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//         Origin: "http://localhost:5500",
//         Referer: "https://reelsaver.net/en/download-audio-instagram",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         loader.classList.remove("show");
//         console.log("API Response:", data);
//       })
//       .catch((error) => {
//         loader.classList.remove("show");
//         console.error("API Request Error:", error);
//       });
//   }
// });

// fetchLinkButton.addEventListener("click", async () => {
//   var data;
//   loader.classList.add("show");
//   if (urlInputLink.value == "") {
//     alert("empty!");
//     return;
//   } else {
//     fetchAndProcessData(dynamic_url_maker(urlInputLink.value))
//       .then(function (result) {
//         console.log(result);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//     urlInputLink.value = "";
//   }
// });

fetchLinkButton.addEventListener("click", async () => {
  const val = localStorage.getItem("title");
  const inputURL = urlInputLink.value.trim();

  if (inputURL === "") {
    displayError("Empty! Input URL media link");
    return;
  }

  if (!isValidURL(inputURL)) {
    displayError("Invalid URL media link");
    return;
  }

  try {
    loader2.style.display = "none";
    loaderSpan.style.display = "block";
    loader.classList.add("show");

    if (val === "story") {
      const storyData = await sendStory(inputURL);
      if (storyData.parsedData.data) {
        loader2.style.display = "block";
        loaderSpan.style.display = "none";
        var newArr = extractFromStory(storyData.parsedData.data.items);
        sendReelDetails(newArr, "downloadReel");
      } else {
        noticeMessage.textContent = "Private account or invalid url";
        notice.classList.add("show");
        wrapper.classList.add("show");
        loader.classList.remove("show");
      }
      // Handle story data as needed
      return;
    }

    const responseData = await sendUrlTest(inputURL);
    // console.log(responseData);
    const data = responseData.parsedData;

    if (data.error) {
      displayError("Check the link, refresh and try again");
      throw new Error("Network response was not ok");
    }

    loader2.style.display = "block";
    loaderSpan.style.display = "none";

    switch (val) {
      case "video":
        getVid(data);
        break;
      case "images":
        getImage(data);
        break;
      case "reels":
        getReels(data);
        break;
      case "igtv":
        getIGTV(data);
        break;
      default:
        // Handle other cases if needed
        break;
    }
  } catch (error) {
    loader.classList.remove("show");
    console.error(error);
    throw error; // Rethrow the error to be caught in your original code
  }
});

function isValidURL(url) {
  const re =
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  return re.test(url.replace(/ /g, ""));
}

function displayError(message) {
  noticeMessage.textContent = message;
  notice.classList.add("show");
  wrapper.classList.add("show");
}

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

  // Assuming innerFileCont is a variable defined elsewhere in your code
  innerFileCont.innerHTML = fileFormat;
}

// findFile.addEventListener("click", () => {
//   const val = localStorage.getItem("title");
//   if (urlInputLink.value == "") {
//     alert("enter in the pasted code");
//     return;
//   } else {
//     innerFileCont.innerHTML = "";
//     if (val === "video") {
//       getVid();
//     } else if (val === "images") {
//       getImage();
//     } else if (val === "reels") {
//       getReels();
//     }
//   }
// });

const sendDetailsVideo = (url, img, route) => {
  // fetch(`https://instagram-downloader.onrender.com/api/${route}`, {
  fetch(`https://instagram-backend-kcm3.onrender.com/api/${route}`, {
    // fetch(`http://localhost:8088/api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoURL: url, videoThumbnail: img }),
  })
    .then((response) => {
      loader.classList.remove("show");
      if (response.ok) {
        innerFileCont?.classList.add("show");
        return response.json(); // Return the response data
      } else {
        loader.classList.remove("show");
        noticeMessage.textContent =
          "Not a video file. Select video and re-upload";
        notice.classList.add("show");
        wrapper.classList.add("show");
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
      noticeMessage.textContent = "input the right media link";
      notice.classList.add("show");
      wrapper.classList.add("show");
    });
};
const sendDetailsImages = (url, img, route) => {
  // fetch(`https://instagram-downloader.onrender.com/api/${route}`, {
  fetch(`https://instagram-backend-kcm3.onrender.com/api/${route}`, {
    // fetch(`http://localhost:8088/api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoURL: url, videoThumbnail: img }),
  })
    .then((response) => {
      loader.classList.remove("show");
      if (response.ok) {
        innerFileCont?.classList.add("show");
        return response.json(); // Return the response data
      } else {
        loader.classList.remove("show");
        noticeMessage.textContent =
          "Not an image file. Select images and re-upload";
        notice.classList.add("show");
        wrapper.classList.add("show");
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
      noticeMessage.textContent = "input the right media link";
      notice.classList.add("show");
      wrapper.classList.add("show");
    });
};

const finishUp = (url, image) => {
  fetch(`https://instagram-downloader.onrender.com/api/${route}`, {
    // fetch("http://localhost:8088/api/deleteVid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoURL: url, videoThumbnailURL: image }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Return the response data
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

function getIGTV(data) {
  let jsonData = data;
  let videoURL;
  let videoThumbnail;
  if (jsonData.graphql) {
    videoURL = jsonData?.graphql?.shortcode_media?.video_url;
    videoThumbnail = jsonData?.graphql?.shortcode_media?.display_url;
  } else if (jsonData.items) {
    videoURL = jsonData?.items?.[0]?.video_versions?.[0]?.url;
    videoThumbnail = jsonData?.items?.[0]?.image_versions2?.candidates[0].url;
  } else {
    // show_snackbar(2);
  }
  if (videoURL || videoThumbnail) {
    sendDetailsVideo(videoURL, videoThumbnail, "downloadVid");
  }
  urlInputLink.value = "";
}
function getVid(data) {
  let jsonData = data;
  let videoURL;
  let videoThumbnail;
  if (jsonData.graphql) {
    videoURL = jsonData?.graphql?.shortcode_media?.video_url;
    videoThumbnail = jsonData?.graphql?.shortcode_media?.display_url;
  } else if (jsonData.items) {
    videoURL = jsonData?.items?.[0]?.video_versions?.[0]?.url;
    videoThumbnail =
      jsonData?.items?.[0]?.image_versions2?.additional_candidates?.first_frame
        .url;
  } else {
    // show_snackbar(2);
  }
  if (videoURL || videoThumbnail) {
    sendDetailsVideo(videoURL, videoThumbnail, "downloadVid");
  }
  urlInputLink.value = "";
}

function getImage(data) {
  let jsonData = data;
  let imageURL;
  let imageThumbnail;
  if (jsonData.graphql) {
    imageURL = jsonData?.graphql?.shortcode_media?.display_resources[0].src;
    imageThumbnail = jsonData?.graphql?.shortcode_media?.display_url;
  } else if (jsonData.items) {
    // console.log(jsonData?.items?.[0]);
    imageURL = jsonData?.items?.[0]?.image_versions2?.candidates[0]?.url;
    imageThumbnail = jsonData?.items?.[0]?.image_versions2?.candidates[0]?.url;
  } else {
    // show_snackbar(2);
  }
  if (imageURL || imageThumbnail) {
    sendDetailsImages(imageURL, imageThumbnail, "downloadImg");
  }
  urlInputLink.value = "";
}

function getReels(data) {
  let jsonData = data;
  let reelURL;
  let reelThumbnail;
  var newArr;
  // console.log("reel oo");
  if (jsonData.graphql) {
    newArr = extractFromArr2(
      jsonData?.graphql?.shortcode_media?.edge_sidecar_to_children?.edges
    );
    // console.log(newArr);
  } else if (jsonData.items) {
    newArr = extractFromArr(jsonData?.items?.[0].carousel_media);
    // console.log("items");
    // console.log(newArr);
  } else {
    // show_snackbar(2);
  }
  if (newArr) {
    sendReelDetails(newArr, "downloadReel");
  }
  urlInputLink.value = "";
}

function extractFromArr(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array of objects");
  }
  const newArray = arr.map((obj) => {
    if (typeof obj === "object" && obj !== null) {
      const { video_versions, image_versions2 } = obj;
      // Return a new object with only 'video_versions' and 'img'
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
      // Return a new object with only 'video_url' and 'img'
      return { video_url, display_url };
    } else {
      return {};
    }
  });

  return newArray;
}
function extractFromStory(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array of objects");
  }
  const newArray = arr.map((obj) => {
    if (typeof obj === "object" && obj !== null) {
      const { video_url, thumbnail_url } = obj;
      // Return a new object with only 'video_url' and 'img'
      return { video_url, display_url: thumbnail_url };
    } else {
      return {};
    }
  });

  return newArray;
}

const sendReelDetails = (url, route) => {
  // fetch(`https://instagram-downloader.onrender.com/api/${route}`, {
  fetch(`https://instagram-backend-kcm3.onrender.com/api/${route}`, {
    // fetch(`http://localhost:8088/api/${route}`, {
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
      console.error(error);
    });
};

function pasteText(targetInput) {
  navigator.clipboard
    .readText()
    .then((pastedText) => {
      targetInput.value = pastedText;
      targetInput.focus();
    })
    .catch((err) => {
      console.error("Unable to read clipboard data", err);
    });
}

pasteBut1.addEventListener("click", (e) => {
  e.preventDefault();
  pasteText(urlInputLink);
});

const sendUrlTest = (url) => {
  // Return the Promise returned by fetch
  // return fetch("https://python-backend-lr4t.onrender.com/api/downloadFile", {
  return fetch("https://instagram-backend-kcm3.onrender.com/api/downloadFile", {
    // return fetch("http://127.0.0.1:8088/api/downloadFile", {
    // return fetch("https://instagram-downloader.onrender.com/api/downloadFile", {
    method: "POST",
    mode: "cors", // Specify 'cors' mode
    credentials: "same-origin",
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
        noticeMessage.textContent = "Error in media retrieval";
        notice.classList.add("show");
        wrapper.classList.add("show");
        throw new Error("Not authenticated");
      } else if (response.ok) {
        return response.json(); // Return the response data
      } else {
        // throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      loader.classList.remove("show");
      noticeMessage.textContent = "Check the link, refresh and try again";
      notice.classList.add("show");
      wrapper.classList.add("show");
      // console.log(error);
      throw error; // Rethrow the error to be caught in your original code
    });
};
const sendStory = (url) => {
  // Return the Promise returned by fetch
  // return fetch("https://python-backend-lr4t.onrender.com/api/downloadFile", {
  return fetch(
    "https://instagram-backend-kcm3.onrender.com/api/downloadStory",
    {
      // return fetch("http://127.0.0.1:8088/api/downloadStory", {
      // return fetch("https://instagram-downloader.onrender.com/api/downloadFile", {
      method: "POST",
      mode: "cors", // Specify 'cors' mode
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    }
  )
    .then((response) => {
      // console.log(response.status);
      if (
        response.status === 403 ||
        response.status === 401 ||
        response.status === 500
      ) {
        noticeMessage.textContent = "Error in media retrieval";
        notice.classList.add("show");
        wrapper.classList.add("show");
        throw new Error("Not authenticated");
      } else if (response.ok) {
        return response.json(); // Return the response data
      } else {
        // throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      loader.classList.remove("show");
      noticeMessage.textContent = "Check the link, refresh and try again";
      notice.classList.add("show");
      wrapper.classList.add("show");
      // console.log(error);
      throw error; // Rethrow the error to be caught in your original code
    });
};

async function getContentFromDynamicURL(dynamic_url) {
  const dynamicURL = `${dynamic_url}`; // Use CORS Anywhere as a proxy

  const customHeaders = {
    "X-Requested-With": "XMLHttpRequest", // A common header sent by browsers
    Referer: "https://www.instagram.com/", // Set the Referer header to the Instagram domain
  };

  try {
    const response = await fetch(dynamicURL, {
      method: "GET",

      headers: customHeaders,
      credentials: "include",
    });

    if (response.ok) {
      loader.classList.remove("show");
      const responseData = await response.json();
      // Process the responseData
      console.log(responseData);
    } else {
      console.error(`Request failed with status code: ${response.status}`);
    }
  } catch (error) {
    loader.classList.remove("show");
    console.error("An error occurred:", error);
  }
}

const anotherWayDownload = (url) => {
  return fetch(
    "https://instagram-backend-kcm3.onrender.com/api/downloadAnotherWay",
    {
      // return fetch("http://localhost:8088/api/downloadAnotherWay", {
      // return fetch("https://instagram-downloader.onrender.com/api/downloadFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json(); // Return the response data
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      loader.classList.remove("show");
      console.error(error);
      throw error; // Rethrow the error to be caught in your original code
    });
};

// const _ = (e) => document.querySelector(e);
// const render = _(".result");

const simpleWay = (url) => {
  fetch(url, {
    credentials: "include",
  }).then((r) =>
    r.text().then((r) => {
      console.log(r);
    })
  );
};

// function fetchAndProcessData(url) {
//   return new Promise(function (resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.withCredentials = true;

//     xhr.onload = function () {
//       if (xhr.status === 200) {
//         var htmlContent = xhr.responseText;
//         try {
//           var data = JSON.parse(htmlContent);
//           var parsedData = "";

//           if (data.graphql) {
//             parsedData = data;
//           } else if (data.items) {
//             parsedData = data;
//           }

//           if (!parsedData) {
//             reject(new Error("Not found"));
//           } else {
//             resolve({ parsedData });
//           }
//         } catch (error) {
//           reject(error);
//         }
//       } else {
//         reject(new Error("Failed to fetch data from the URL"));
//       }
//     };

//     xhr.onerror = function () {
//       reject(new Error("Network error"));
//     };

//     xhr.send();
//   });
// }

// // Usage
