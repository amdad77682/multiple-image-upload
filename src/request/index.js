import { axios } from "../network/index";
export const getImage = async (reqbody) => {
  try {
    const apiUrl = `https://48c8-103-155-219-36.ngrok.io/api/v1/images/resize/stat`;
    const res = await axios.post(apiUrl, reqbody);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};
export async function uploadImageCore(file, Public, resolutions) {
  const form = new FormData();
  form.append("files", file, file.name);
  form.append("public", Public);
  form.append("resolutions", resolutions);
  try {
    const apiUrl = "https://48c8-103-155-219-36.ngrok.io/api/v1/images/";
    const res = await axios.post(apiUrl, form);

    if (res.status == 201) {
      return Promise.resolve(res);
    } else {
      return Promise.reject();
    }
  } catch (error) {
    // console.log(error);

    return Promise.reject(error.response.data);
  }
}
