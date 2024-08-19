// MetadataTable.tsx
import React from "react";
import { MetaData } from "../interfaces/metadataInterface";

interface MetadataTableProps {
    metaData: MetaData[];
}

const MetadataTable: React.FC<MetadataTableProps> = ({ metaData }) => {
    return (
        <div className="flex justify-center mt-10">
            <div className="overflow-x-auto w-4/5">
                <div className="overflow-x-auto">
                    <table className="border-collapse border border-slate-500">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 border border-slate-600">URL</th>
                                <th className="px-4 py-3 border border-slate-600">Title</th>
                                <th className="px-4 py-3 border border-slate-600">Provider</th>
                                <th className="px-4 py-3 border border-slate-600">Description</th>
                                <th className="px-4 py-3 border border-slate-600">Icon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metaData.map((data, index) => (
                                <tr key={index} className="odd:bg-white even:bg-slate-50">
                                    <td className="px-4 py-3 border border-slate-700">
                                        {data.url === undefined ? "No URL" : data.url}
                                    </td>
                                    <td className="px-4 py-3 border border-slate-700">
                                        {data.title === undefined ? "No Title" : data.title}
                                    </td>
                                    <td className="px-4 py-3 border border-slate-700">
                                        {data.provider === undefined ? "No Provider" : data.provider}
                                    </td>
                                    <td className="px-4 py-3 border border-slate-700">
                                        {data.description === undefined ? "No Description" : data.description}
                                    </td>
                                    <td className="px-4 py-3 border border-slate-700">
                                        {data.icon && <img src={data.icon} alt="icon" />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MetadataTable;
