import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import ListView from "@/views/ListView";
import TaskView from "@views/TaskView";
import NewTaskView from "./views/NewTaskView";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListView/>} />
                <Route path="/:id" element={<TaskView/>}/>
                <Route path="/new" element={<NewTaskView/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
