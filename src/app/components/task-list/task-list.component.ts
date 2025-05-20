import { Component, OnInit } from '@angular/core';
import { CamundaService } from '../../services/camunda.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports : [NgFor , NgIf] ,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  selectedTask: any = null;
  taskFormVariables: any = {};
  taskVariables: any = {};
  
  constructor(private camundaService: CamundaService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.camundaService.getAllTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  selectTask(task: any): void {
    this.selectedTask = task;
    this.loadTaskFormVariables(task.id);
  }

  loadTaskFormVariables(taskId: string): void {
    this.camundaService.getTaskFormVariables(taskId).subscribe(
      (data) => {
        this.taskFormVariables = data;
      },
      (error) => {
        console.error('Error loading task variables:', error);
      }
    );
  }

  addTaskVariable(key: string, value: any): void {
    this.taskVariables[key] = value;
  }

  completeTask(): void {
    if (!this.selectedTask) return;
    
    this.camundaService.completeTask(this.selectedTask.id, this.taskVariables).subscribe(
      () => {
        console.log('Task completed');
        this.loadTasks();
        this.selectedTask = null;
        this.taskFormVariables = {};
        this.taskVariables = {};
      },
      (error) => {
        console.error('Error completing task:', error);
      }
    );
  }
}