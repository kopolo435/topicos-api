import { Link } from "react-router-dom";

export default function TableRow({
    id,
    title,
    dueBy,
    important,
    completed
}: ListItemProps) {
    return (
        <tr>
            <td>{title}</td>
            <td>{new Date(dueBy).toLocaleDateString()}</td>
            <td>{important && (
                <i className="bi bi-star-fill text-lg text-yellow-300"></i>
            )}</td>
            <td>{completed ? (
                <div className="flex items-center gap-2">
                    <div aria-label="success" className="status status-success"></div>
                    <span>Completed</span>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <div aria-label="success" className="status status-warning"></div>
                    <span>Not yet completed</span>
                </div>
            )}</td>
            <td>
                <Link to={`/${id}`} className="link link-primary">View</Link>
            </td>
        </tr>
    );
}

interface ListItemProps {
    id: string;
    title: string;
    dueBy: Date | string;
    important: boolean;
    completed: boolean;
}