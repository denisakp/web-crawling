import * as cheerio from "cheerio";
import {getOrigin, isInternalLink, parseURL, removeNonExploitableLinks} from "./url.js";
import {fetchHtml} from "./network.js";
import {formatResponse, generateJSONData, parseText, trimText} from "./utils.js";
import {saveCrawl} from "./databse/actions.js";
import {connectToDatabase} from "./databse/database.js";

const process__crawl = async(url) => {
    console.info('')

    const origin = getOrigin(url);

    const parsedUrl = parseURL(url);

    let temp_internal = [];
    let temp_external = [];

    const html = await fetchHtml(parsedUrl);
    const $ = cheerio.load(html);

    const linksObject = $('a');

    linksObject.each((index, item) => {
        const element_attr = $(item).attr('href')
        const element_txt = $(item).text()

        if (!element_attr) return;
        if (element_attr.startsWith('#')) return;

        if (!isInternalLink(url, element_attr)) {
            temp_external.push({
                text: parseText(element_txt),
                href: trimText(element_attr)
            })
        } else {
            temp_internal.push({
                text: parseText(element_txt),
                href: parseURL(element_attr)
            });
        }
    });

    const dataset = {
        origin,
        url: parsedUrl,
        count_links: temp_internal.length + temp_external.length,
        internal_links: formatResponse(removeNonExploitableLinks(temp_internal)),
        external_links: formatResponse(removeNonExploitableLinks(temp_external)),
    }

    console.info('saving to database......');
    await saveCrawl(dataset);

    console.info('generating JSON file......');
    await generateJSONData(dataset);
}

export const crawl = async (url) => {
    console.info('starting program......');
    await connectToDatabase()
    await process__crawl(url)
        .then(() => console.info('process done'))
        .catch((e) => console.error(e))
}
