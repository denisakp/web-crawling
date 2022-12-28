import { URL } from 'node:url';

export const parseURL = (uri) => uri.charAt(uri.length - 1) !== '/' ? uri+'/' : uri;

// check if a given link is a valid url
export const isValidURL = (url) => {
    try {
        return !!new URL(url);
    }catch (e) {
        return false;
    }
}

// construct absolute url
export const urlJoin = (href, hostname) => new URL(href, hostname);

export const removeNonExploitableLinks = (data) => {
    if(!data) return;
    return data.filter(item => {
        if (item.href && item.text){
            return item.href.length > 1 || item.text.length <= 0
        }
    });
}

export const isInternalLink = (url, href) => {
    if (!href || !url) return;
    if (!isValidURL(url)) return ;

    const origin_ = new URL(url).origin;

    if (!isValidURL(href)) {
        href = urlJoin(href, origin_).toString()
    }
    return has__same__hostname(url, href);
}

const has__same__hostname = (url1, url2) => {
    const u1_host = (new URL(url1).host).split('.');
    const u2_host = (new URL(url2).host).split('.');
    return u1_host.some(item => u2_host.includes(item));
}

export const getOrigin = (url) => {
    if(!isValidURL(url)) return;
    const my__url = new URL(url);
    return my__url.origin;
}
