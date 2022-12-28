import { Crawl } from "./model.js";
export const saveCrawl = async (data) => {
    const crawl = new Crawl({...data});
    await crawl.save((err, crawl) => {
        if (err) return err;
        return crawl;
    });
}
