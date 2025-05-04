export interface ITask {
    id: string | null;
    title: string | null;
    description: string | null;
    dueBy: Date;
    createdAt: Date;
    important: boolean;
    completed: boolean;
}

export interface IAlertMessage {
    daisyColor: `alert-${"success" | "warning" | "error"}`;
    message: string;
}