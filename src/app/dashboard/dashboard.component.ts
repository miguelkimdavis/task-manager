import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Model/task';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;
  tasks: Task[] = [];
  editMode: boolean = false;
  selectedTask!: Task;
  currentTaskId:string | undefined = "";
  errorMessage: string | null = null;

  onDelete(id: string | undefined) {
    this.taskService.deleteTask(id);
    this.fetchAllTasks();
  }

  onEditTask(id: string | undefined) {
    this.currentTaskId = id;
    this.showCreateTaskForm = true;
    this.editMode = true;
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      this.selectedTask = task;
    } else {
      this.selectedTask = {
        title: '',
        description: '',
        assignedTo: '',
        createdAt: '',
        priority: '',
        status: '',
      };
    }
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask = {
      title: '',
      description: '',
      assignedTo: '',
      createdAt: '',
      priority: '',
      status: '',
    };
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  createorUpdateTask(data: Task) {
    
    this.CloseCreateTaskForm();
    if(!this.editMode){
      this.taskService.createTask(data); 
      this.tasks.push(data);
    }
    else{
      this.taskService.updateTask(this.currentTaskId, data);
    }
  }

  private fetchAllTasks() {
    this.taskService.getTask()
    .subscribe((task)=>{
      console.log(task);
      this.tasks = task;
    })
  }

  constructor(private http: HttpClient, private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.fetchAllTasks();
  }
}
