import { IAlertMessage } from "@/lib/types";

export default function Alert({
    daisyColor,
    message
}: IAlertMessage): React.JSX.Element {
    return (
        <div id="alert" role="alert" className={"alert m-4 " + daisyColor}>
            <span >{message}</span>
            <button className="justify-self-end" onClick={() => document.getElementById("alert")?.classList.add("hidden")}>
                <i className="bi bi-x-lg hover:text-white"></i>
            </button>
        </div>
    );
}
