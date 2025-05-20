import { Routes } from '@angular/router';
import { ProcessStarterComponent } from "./components/process-starter/process-starter.component"
import { TaskListComponent } from "./components/task-list/task-list.component"
export const routes: Routes = [
    {
        path : "start" , component : ProcessStarterComponent
    },
    {
        path : "tasks" , component : TaskListComponent
    }
];
