import { useEffect, useState } from "react";
import { buildUrl, objectEmpty } from "@lib/utils"
import { IAlertMessage, ITask } from "@lib/types";
import { Link, useLocation } from "react-router-dom";
import Alert from "@components/Alert";
import TableRow from "@/components/TableRow";

export default function ListView(): React.JSX.Element {
    const location = useLocation();
    const alert: IAlertMessage = location.state || {};
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Array<ITask>>([]);
    useEffect(() => {
        const fetchAllTasks = async () => {
            const url = buildUrl(import.meta.env.VITE_API_URL!, "api/task");
            const response = await fetch(url, {
                method: "GET",
            });
            if (response.ok) {
                setData(await response.json());
            }
        };
        fetchAllTasks();
    }, []);

    useEffect(() => {
        setLoading(data.length === 0);
    }, [data]);

    return (
        <>
            {!objectEmpty(alert) &&
                <Alert daisyColor={alert.daisyColor} message={alert.message} />
            }
            <div className="w-full max-w-5xl mx-auto p-4">
                <h1 className="text-3xl font-semibold my-4">Simple To-do App </h1>
                <div className="overflow-x-auto rounded-box shadow-md bg-base-100 mb-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Due by</th>
                                <th>Important</th>
                                <th>Status</th>
                                <th>More</th>
                            </tr>
                        </thead>

                        {loading ? (
                            <tr>
                                <td colSpan={5}>
                                    <div className="w-full flex justify-center my-8">
                                        <span className="loading loading-spinner text-primary loading-xl"></span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <tbody>
                                {
                                    data.map((item) => (
                                        <TableRow key={item.id} id={item.id!} title={item.title!} dueBy={item.dueBy} important={item.important} completed={item.completed} />
                                    ))
                                }
                            </tbody>
                        )}
                    </table>
                </div>
                <Link to="/new" className="btn btn-primary w-full">New task</Link>
            </div>
        </>
    );
}

