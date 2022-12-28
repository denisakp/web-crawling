import mongoose from "mongoose";

const crawlSchema = new mongoose.Schema({
    origin: String,
    url: String,
    count_links: Number,
    internal_links: [{ text: String, href: String }],
    external_links: [{ text: String, href: String }],
}, { timestamps: true} )

export const Crawl = new mongoose.model('Crawl', crawlSchema);
