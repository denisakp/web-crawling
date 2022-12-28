import fetch from "node-fetch";

export const fetchHtml = async (url) => {
    const response = await fetch(url);
    return  await response.text();
}

const pingUri = async (uri)=> {
    const response = await fetch(uri)
    return response.status === 200;
}
