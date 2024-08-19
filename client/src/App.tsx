import React, { useState } from "react";
import MetadataTable from "./components/MetadataTable";
import { MetaData } from "./interfaces/metadataInterface";

const App: React.FC = () => {
    const [urls, setUrls] = useState<string[]>(["", "", ""]);
    const [metaData, setMetaData] = useState<MetaData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newUrls = [...urls];
        newUrls[index] = event.target.value;
        setUrls(newUrls);
    };
    const isUrlsUnique = (urls: string[]): boolean => {
        const trimmedUrls = urls.map((url) => url.trim()).filter((url) => url !== "");
        const uniqueUrls = new Set(trimmedUrls);
        return uniqueUrls.size >= 3;
    };
    const addUrlField = () => {
        setUrls([...urls, ""]);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        if (!isUrlsUnique(urls)) {
            alert("Please enter at least 3 unique URLs.");
            setIsLoading(false);
            return;
        }

        fetch("http://localhost:3001/metadata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ urlList: urls }),
        })
            .then((res) => {
                if (res.status === 500 || res.status === 400) {
                    return res.json().then((err) => {
                        throw new Error(err.err || "Failed to fetch metadata");
                    });
                }
                return res.json();
            })
            .then((data) => {
                const result: MetaData[] = [];
                for (const key in data.metadata) {
                    const { url, title, provider, icon, description } = data.metadata[key];
                    result.push({ url, title, provider, icon, description });
                }
                setMetaData(result);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h3>Enter at least 3 URLs:</h3>
                    {urls.map((url, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                URL {index + 1}:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="url"
                                    className="input-container"
                                    value={url}
                                    onChange={(event) => handleInputChange(index, event)}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-nowrap space-x-12">
                        <button type="button" onClick={addUrlField} className="btn-primary">
                            + Add another URL
                        </button>
                        <button type="submit" disabled={isLoading} className="btn-primary">
                            {isLoading ? "Loading..." : "Submit URLs"}
                        </button>
                    </div>
                </form>
            </div>
            <br />
            <MetadataTable metaData={metaData} />
        </>
    );
};

export default App;
