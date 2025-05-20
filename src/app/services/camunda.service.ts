import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamundaService {
  private apiUrl = 'http://localhost:8080/engine-rest'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': 'Basic ' + btoa('demo:demo')
    });
  }

  // Start a process instance
  startProcessInstance(processDefinitionKey: string, variables?: any): Observable<any> {
    const url = `${this.apiUrl}/process-definition/key/${processDefinitionKey}/start`;
    const body = {
      variables: this.prepareVariables(variables)
    };
    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  // Get all process instances
  getProcessInstances(): Observable<any> {
    const url = `${this.apiUrl}/process-instance`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Get tasks for a specific process instance
  getTasksForProcessInstance(processInstanceId: string): Observable<any> {
    const url = `${this.apiUrl}/task?processInstanceId=${processInstanceId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Get all tasks
  getAllTasks(): Observable<any> {
    const url = `${this.apiUrl}/task`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Complete a task
  completeTask(taskId: string, variables?: any): Observable<any> {
    const url = `${this.apiUrl}/task/${taskId}/complete`;
    const body = {
      variables: this.prepareVariables(variables)
    };
    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  // Get task form variables
  getTaskFormVariables(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/task/${taskId}/form-variables`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Get process definition
  getProcessDefinition(processDefinitionKey: string): Observable<any> {
    const url = `${this.apiUrl}/process-definition/key/${processDefinitionKey}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Get process definitions
  getProcessDefinitions(): Observable<any> {
    const url = `${this.apiUrl}/process-definition`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Helper method to prepare variables for Camunda API
  private prepareVariables(variables: any): any {
    if (!variables) return {};
    
    const result: any = {};
    Object.keys(variables).forEach(key => {
      result[key] = { value: variables[key] };
    });
    return result;
  }
}