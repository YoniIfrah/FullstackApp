import { Request, Response } from "express";
import getMetaData from "metadata-scraper";

export const metadataByUrls = async (req: Request, res: Response) => {
    const urlList: string[] = req.body.urlList;
    const response: Record<string, any> = {};
    const errors: string[] = [];

    try {
        // validation check
        if (!urlList || urlList.length === 0) {
            errors.push("Invalid URLs list");
            return res.status(400).send({
                err: errors,
            });
        }

        // fetch metadata
        for (const item of urlList) {
            try {
                const metadataResults = await getMetaData(item);

                response[item] = metadataResults;
            } catch (error) {
                errors.push(`Invalid URL: ${item}`);
                return res.status(400).send({
                    err: errors,
                });
            }
        }

        res.status(200).json({ metadata: response });
    } catch (error) {
        return res.status(500).send({
            err: errors,
        });
    }
};
