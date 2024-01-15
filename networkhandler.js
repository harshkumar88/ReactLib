import { get_access_token } from "./auth";

async function get_data(url, appContext) {
  try {
    // appContext.setLoad(true);
    const response = await fetch(url, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        "access-token": get_access_token(),
        client: "web",
      }),
    });
    // appContext.setLoad(false);
    const data = await response.json();

    if (data.error && data.error.status_code === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    appContext.setAlert(error.message, "alert_error");
    appContext.setLoad(false);
  }
}

async function post_data(url, data, appContext, show) {
  try {
    appContext.setLoad(true);
    const response = await fetch(url, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        "access-token": get_access_token(),
      }),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (responseData?.status_code === 4003) {
      throw new Error(responseData.success_msg);
    }

    if (responseData?.status_code === 4005) {
      return responseData;
    }

    if (responseData.error) {
      throw new Error(responseData.error.message);
    }

    appContext.setLoad(false);
    appContext.setReload(!appContext.reload);
    show && appContext.setAlert(responseData.message, "alert_success");

    return responseData;
  } catch (error) {
    appContext.setAlert(error.message, "alert_error");
    appContext.setLoad(false);
  }
}

async function post_data_without_reload(url, data, appContext, show) {
  try {
    appContext.setLoad(true);
    const response = await fetch(url, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        "access-token": get_access_token(),
      }),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (responseData?.status_code === 4003) {
      throw new Error(responseData.success_msg);
    }

    if (responseData?.status_code === 4005) {
      return responseData;
    }

    if (responseData.error) {
      throw new Error(responseData.error.message);
    }

    appContext.setLoad(false);
    show && appContext.setAlert(responseData.message, "alert_success");

    return responseData;
  } catch (error) {
    appContext.setAlert(error.message, "alert_error");
    appContext.setLoad(false);
  }
}

async function put_data(url, data, appContext, show) {
  try {
    const response = await fetch(url, {
      method: "put",
      headers: new Headers({
        "Content-Type": "application/json",
        "access-token": get_access_token(),
      }),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (responseData.error) {
      throw new Error(responseData.error.message);
    }

    appContext.setLoad(false);
    appContext.setReload(!appContext.reload);
    show && appContext.setAlert(responseData.message, "alert_success");

    return responseData;
  } catch (error) {
    appContext.setAlert(error.message, "alert_error");
    appContext.setLoad(false);
  }
}

async function download_blob(url, appContext) {
  try {
    const response = await fetch(url, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/vnd.ms-excel",
        responseType: "arraybuffer",
        "access-token": get_access_token(),
      }),
    });

    const data = await response.blob();
    let newBlob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(newBlob);
    link.setAttribute("download", "download.xlsx");
    link.click();
  } catch (error) {
    appContext.setAlert(error.message, "alert_error");
    appContext.setLoad(false);
  }
}

async function patch_data(url, data, appContext, show) {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
        "access-token": get_access_token(),
      }),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (responseData.error) {
      throw new Error(responseData.error.message);
    }

    appContext.setLoad(false);
    appContext.setReload(!appContext.reload);
    show && appContext.setAlert(responseData.message, "alert_success");

    return responseData;
  } catch (error) {
    appContext.setAlert(error.message, "alert_error");
    appContext.setLoad(false);
  }
}

async function delete_data(url, appContext, show) {
  try {
    const response = await fetch(url, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
        "access-token": get_access_token(),
      }),
    });
    const responseData = await response.json();

    if (responseData.error) {
      throw new Error(responseData.error.message);
    }

    appContext.setLoad(false);
    appContext.setReload(!appContext.reload);
    show && appContext.setAlert(responseData.message, "alert_success");

    return responseData;
  } catch (error) {
    appContext.setAlert(error.message, "alert_error");
    appContext.setLoad(false);
  }
}

async function post_img(url, fd) {
  try {
    return false;
    const response = await fetch(url, {
      method: "post",
      body: fd,
      headers: new Headers({
        "Content-Type": "application/json",
        "access-token": get_access_token(),
      }),
    });
    return await response.json();
  } catch (error) {
    // Handle error if needed
  }
}

export {
  get_data,
  post_data,
  put_data,
  patch_data,
  post_img,
  delete_data,
  download_blob,
  post_data_without_reload,
};
