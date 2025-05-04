import Alert from "@/components/Alert";
import { IAlertMessage, ITask } from "@lib/types";
import { buildUrl, inputDateValueFormat, objectEmpty } from "@lib/utils";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function TaskView(): React.JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const alert: IAlertMessage = location.state || {};
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [task, setTask] = useState<ITask>({} as ITask);
    const [editing, setEditing] = useState<boolean>(false);
    useEffect(() => {
        const fetchTaskById = async () => {
            const url = buildUrl("http://localhost:3000", `api/task/${id}`);
            const response = await fetch(url, {
                method: "GET",
            });
            if (response.ok) {
                setTask(await response.json());
            }
        };
        fetchTaskById();
    }, [id]);

    useEffect(() => {
        setLoading(objectEmpty(task));
    }, [task]);

    const editTask = async () => {
        setEditing(false);

        const title = task.title;

        (document.getElementById("confirm-delete") as HTMLDialogElement).close();

        const url = buildUrl("http://localhost:3000", `api/task/${id}`);

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            navigate("/", {
                state: {
                    daisyColor: "alert-success",
                    message: "Task '" + title + "' has been successfully modified."
                }
            });
        } else {
            navigate(`/${id}`, {
                state: {
                    daisyColor: "alert-error",
                    message: "There was an error modifying this task. (Status: " + response.status + ")"
                }
            });
        }
    }
    const showConfirmEdit = () => {
        (document.getElementById("confirm-edit") as HTMLDialogElement).showModal();
    }

    const showConfirmDelete = () => {
        (document.getElementById("confirm-delete") as HTMLDialogElement).showModal();
    }

    const deleteTask = async () => {
        setEditing(false);

        const title = task.title;

        (document.getElementById("confirm-delete") as HTMLDialogElement).close();

        const url = buildUrl("http://localhost:3000", `api/task/${id}`);
        const response = await fetch(url, {
            method: "DELETE",
        });

        if (response.ok) {
            navigate("/", {
                state: {
                    daisyColor: "alert-success",
                    message: "Task '" + title + "' has been successfully deleted."
                }
            });
        } else {
            navigate(`/${id}`, {
                state: {
                    daisyColor: "alert-error",
                    message: "There was an error deleting this task. (Status: " + response.status + ")"
                }
            });
        }
    }

    return (
        <>
            {!objectEmpty(alert) &&
                <Alert daisyColor={alert.daisyColor} message={alert.message} />
            }
            <dialog id="confirm-edit" className="modal">
                <div className="modal-box">
                    <h3 className="flex-1 font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">Would you really like to save these changes? This action can't be undone</p>
                    <div className="modal-action">
                        <button className="btn btn-success text-white" onClick={editTask}>Save</button>
                        <form method="dialog">
                            <button className="btn btn-primary">Go back</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="confirm-delete" className="modal">
                <div className="modal-box">
                    <h3 className="flex-1 font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">Would you really like to delete this task? This action can't be undone</p>
                    <div className="modal-action">
                        <button className="btn btn-error text-white" onClick={deleteTask}>Delete</button>
                        <form method="dialog">
                            <button className="btn btn-primary">Go back</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="w-full max-w-5xl mx-auto p-4 flex flex-col">
                <h1 className="text-3xl font-semibold my-4">Task details</h1>
                <div className="w-full flex">
                    <div className="breadcrumbs text-sm flex-1">
                        <ul>
                            <li><Link to="/">All tasks</Link></li>
                            <li><Link to={`/${task.id}`}>{task.title}</Link></li>
                        </ul>
                    </div>
                    {!loading &&
                        <div className="flex text-sm gap-4">
                            <button className="link link-primary" onClick={() => setEditing(true)}>Edit</button>
                            <button className="link link-error" onClick={showConfirmDelete}>Delete</button>
                        </div>
                    }
                </div>
                {loading ? (
                    <div className="w-full flex justify-center my-8">
                        <span className="loading loading-spinner text-primary loading-xl"></span>
                    </div>
                ) : (
                    <form className="flex flex-1 flex-col w-full gap-y-4">
                        <fieldset className="fieldset bg-white border-base-300 rounded-box border p-4 shadow-md">
                            <legend className="fieldset-legend text-lg">Title</legend>
                            <input
                                id="title"
                                type="text"
                                className="input w-full bg-gray-50 text-base"
                                placeholder="Write a title..."
                                readOnly={!editing}
                                value={task.title!}
                                onChange={(e) => setTask({ ...task, title: e.target.value })}
                            />
                        </fieldset>
                        <fieldset className="fieldset bg-white border-base-300 rounded-box border p-4 shadow-md">
                            <legend className="fieldset-legend text-lg">Description</legend>
                            <textarea
                                id="description"
                                className="textarea w-full bg-gray-50 text-base"
                                placeholder="Write a description..."
                                readOnly={!editing}
                                value={task.description!}
                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                            ></textarea>
                        </fieldset>
                        <fieldset className="fieldset bg-white border-base-300 rounded-box border p-4 shadow-md">
                            <legend className="fieldset-legend text-lg">Due by</legend>
                            <input
                                id="due-by"
                                type="datetime-local"
                                className="input w-full bg-gray-50 text-base"
                                placeholder="Set a date..."
                                readOnly={!editing}
                                value={inputDateValueFormat(task.dueBy)}
                                onChange={(e) => setTask({ ...task, dueBy: new Date(e.target.value) })}
                            />
                        </fieldset>
                        <fieldset className="fieldset bg-white border-base-300 rounded-box border p-4 shadow-md">
                            <legend className="fieldset-legend text-lg">Created at</legend>
                            <input
                                type="datetime-local"
                                className="input w-full bg-gray-50 text-base"
                                readOnly
                                value={inputDateValueFormat(task.createdAt)}
                            />
                        </fieldset>
                        <fieldset className="fieldset bg-white border-base-300 rounded-box border p-4 shadow-md">
                            <legend className="fieldset-legend text-lg">Details</legend>
                            <div className="flex w-full items-center text-base">
                                <label className="label flex-1">
                                    <input
                                        id="important"
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        defaultChecked={task.important}
                                        disabled={!editing}
                                        onChange={(e) => setTask({ ...task, important: e.target.checked })}
                                    />
                                    <span className="text-black">Important</span>
                                </label>
                                <label className="label flex-1">
                                    <input
                                        id="completed"
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        defaultChecked={task.completed}
                                        disabled={!editing}
                                        onChange={(e) => setTask({ ...task, completed: e.target.checked })}
                                    />
                                    <span className="text-black">Completed</span>
                                </label>
                            </div>
                        </fieldset>

                        {editing &&
                            <div className="flex gap-4 items-center">
                                <button type="button" className="btn btn-primary flex-1" onClick={showConfirmEdit}>Save</button>
                                <button type="button" className="btn btn-error flex-1 text-white" onClick={() => setEditing(false)}>Go back</button>
                            </div>
                        }
                    </form>
                )}
            </div>
        </>
    );
}