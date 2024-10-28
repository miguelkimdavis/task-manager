import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/Model/task'
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  
  createTask(task:Task) {
    this.http.post('https://myangularhttpclient-default-rtdb.firebaseio.com/tasks.json', task)
    .subscribe((response)=>{
      console.log(response);      
    })
  }

  deleteTask(id:string | undefined){
    this.http.delete(`https://myangularhttpclient-default-rtdb.firebaseio.com/tasks/${id}.json`)
    .subscribe((response)=>{
      console.log(response); 
    })
  }

  getTask(){
    return this.http.get<{[key:string]:Task}>('https://myangularhttpclient-default-rtdb.firebaseio.com/tasks.json')
    .pipe(map((response)=>{
      let tasks = []
      for(let key in response){
        if(response.hasOwnProperty(key)){
          tasks.push({...response[key], id:key});
        }
      }
      return tasks;
    }))

  }
  updateTask(id:string|undefined,data:Task){
    this.http.put(`https://myangularhttpclient-default-rtdb.firebaseio.com/tasks/${id}.json`,data)
    .subscribe()
  }
}
