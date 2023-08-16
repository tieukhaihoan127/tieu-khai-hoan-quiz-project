const DOMAIN = "https://8frpnm-8080.csb.app/";

export const get = async(path) => {
    const response = await fetch(DOMAIN + path);
    const result = await response.json();
    return result
}

export const post = async(path,options) => {
    const response = await fetch(DOMAIN + path,{
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(options),
    });
    const result = await response.json();
    return result

}

export const getId = async(path,id) => {
    const response = await fetch(DOMAIN + path + "/" + id);
    const result = await response.json();
    return result
}

export const getTopicId = async(path,id) => {
    const response = await fetch(DOMAIN + path + "/?topicId=" + id);
    const result = await response.json();
    return result
}
