import { Platform } from "react-native";

export const createFormData = (photo, body = {}) => {
  // Initialize the form data, sets encoding type to "multipart/form-data"
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData
  const data = new FormData();

  let photos = photo;
  // If just a single photo was passed, put it into an array
  if (!Array.isArray(photo)) {
    photos = [photo];
  }

  photos.forEach(p => {
    data.append("photo", {
      // On iOS we need to strip file:// so the uri is accessible
      uri: Platform.OS === "android" ? p.uri : p.uri.replace("file://", ""),
      name: p.fileName,
      type: p.type
    });
  });

  // To stick with an api similar to fetch we just pass an object for body. This loops over them so
  // that we can add them to the form data.
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const uploadFileWithProgress = (url, opts = {}, onProgress) =>
  new Promise((res, rej) => {
    // Request initialization
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || "get", url);
    Object.keys(opts.headers || {}).forEach(value => {
      xhr.setRequestHeader(value, opts.headers[value]);
    });

    // Request progress
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress;
    }

    // Request timeout config
    xhr.timeout = 10000;
    xhr.ontimeout = rej;

    // Request success & failure
    xhr.onload = e => {
      res(e.target.response);
    };
    xhr.onerror = rej;

    // Send the request
    xhr.send(opts.body);
  });
