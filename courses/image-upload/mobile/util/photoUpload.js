import { Platform } from "react-native";

export const createFormData = (photo, body = {}) => {
  const data = new FormData();

  if (Array.isArray(photo)) {
    photo.forEach(p => {
      const uri =
        Platform.OS === "android" ? p.uri : p.uri.replace("file://", "");

      data.append("photo", {
        uri,
        name: p.fileName
      });
    });
  } else {
    const uri =
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "");

    data.append("photo", {
      uri,
      name: photo.fileName
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const uploadFileWithProgress = (url, opts = {}, onProgress) =>
  new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || "get", url);
    xhr.timeout = 10000;

    Object.keys(opts.headers || {}).forEach(value => {
      xhr.setRequestHeader(value, opts.headers[value]);
    });

    xhr.onload = e => {
      res(e.target.response);
    };
    xhr.onerror = rej;
    xhr.ontimeout = rej;
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress;
    }
    xhr.send(opts.body);
  });
