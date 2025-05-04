import Alert from "@/components/Alert";
import { IAlertMessage, ITask } from "@/lib/types";
import { assert, buildUrl, inputDateValueFormat, objectEmpty } from "@lib/utils";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NewTaskView(): React.JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const alert: IAlertMessage = location.state || {};
    const [task, setTask] = useState<ITask>({
        id: null,
        title: null,
        description: null,
        dueBy: new Date(),
        createdAt: new Date(),
        important: false,
        completed: false
    } as ITask);

    const showConfirmSave = () => {
        (document.getElementById("confirm-save") as HTMLDialogElement).showModal();
    }

    const validateTask = () => {
        assert(task.title !== null);
        assert(task.description !== null);
        assert(task.createdAt instanceof Date);
    }

    const saveTask = async () => {
        validateTask();

        const url = buildUrl("http://localhost:3000", "api/task");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            navigate("/", {
                state: {
                    daisyColor: "alert-success",
                    message: "Task '" + task.title + "' has been successfully created."
                }
            });
        } else {
            navigate("/new", {
                state: {
                    daisyColor: "alert-error",
                    message: "There was an error creating this task. (Status: " + response.status + ")"
                }
            })
        }
    }

    return (
        <>
            {!objectEmpty(alert) &&
                <Alert daisyColor={alert.daisyColor} message={alert.message} />
            }
            <dialog id="confirm-save" className="modal">
                <div className="modal-box">
                    <h3 className="flex-1 font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">
                        Are you sure you want to add task '{task.title}'?
                    </p>
                    <div className="modal-action">
                        <button className="btn btn-success text-white" onClick={saveTask}>Save</button>
                        <form method="dialog">
                            <button className="btn btn-primary">Go back</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="w-full max-w-5xl mx-auto p-4 flex flex-col">
                <h1 className="text-3xl font-semibold my-4">Create a new task</h1>
                <div className="w-full flex">
                    <div className="breadcrumbs text-sm flex-1">
                        <ul>
                            <li><Link to="/">All tasks</Link></li>
                            <li><Link to={`/new`}>New task</Link></li>
                        </ul>
                    </div>
                </div>

                <form className="flex flex-1 flex-col w-full gap-y-4">
                    <fieldset className="fieldset bg-white border-base-300 rounded-box border p-4 shadow-md">
                        <legend className="fieldset-legend text-lg">Title</legend>
                        <input
                            id="title"
                            type="text"
                            className="input w-full bg-gray-50 text-base"
                            placeholder="Write a title..."
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
                            value={inputDateValueFormat(task.dueBy)}
                            onChange={(e) => setTask({ ...task, dueBy: new Date(e.target.value) })}
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
                                    onChange={(e) => setTask({ ...task, important: e.target.checked })}
                                />
                                <span className="text-black">Important</span>
                            </label>
                        </div>
                    </fieldset>
                    <div className="flex gap-4 items-center">
                        <button type="button" className="btn btn-primary flex-1" onClick={showConfirmSave}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}