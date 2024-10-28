import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})

export class CreateTaskComponent implements OnInit {

  @Input()
  isEditMode: boolean = false;

  @Input()
  selectedTask!: Task;

  @ViewChild('taskForm')
  taskForm!: NgForm;

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskdata: EventEmitter<Task> = new EventEmitter<Task>();

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  OnSubmitForm(task: NgForm){
    this.EmitTaskdata.emit(task.value);
    this.CloseForm.emit(true);
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.taskForm.form.patchValue(this.selectedTask)
    },0)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
