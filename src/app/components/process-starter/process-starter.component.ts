import { Component, OnInit } from '@angular/core';
import { CamundaService } from '../../services/camunda.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-process-starter',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './process-starter.component.html',
  styleUrls: ['./process-starter.component.css']
})
export class ProcessStarterComponent implements OnInit {
  processDefinitions: any[] = [];
  selectedProcess: string = '';
  processStarted: boolean = false;
  processInstanceId: string = '';
  formVariables: any = {}; // Ensure this is initialized
  
  // Add the Object reference for the template
  protected Object = Object;
  
  constructor(private camundaService: CamundaService) { }

  ngOnInit(): void {
    this.loadProcessDefinitions();
  }

  loadProcessDefinitions(): void {
    this.camundaService.getProcessDefinitions().subscribe(
      (data) => {
        this.processDefinitions = data;
        console.log('Process definitions loaded:', data);
      },
      (error) => {
        console.error('Error loading process definitions:', error);
      }
    );
  }

  startProcess(): void {
    if (!this.selectedProcess) return;
    
    this.camundaService.startProcessInstance(this.selectedProcess, this.formVariables).subscribe(
      (response) => {
        console.log('Process started:', response);
        this.processStarted = true;
        this.processInstanceId = response.id;
      },
      (error) => {
        console.error('Error starting process:', error);
      }
    );
  }

  addVariable(key: string, value: any): void {
    this.formVariables[key] = value;
  }
}