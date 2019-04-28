import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from './ticket';
import { TICKETS } from './mock-tickets';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './models/Todo';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';

  constructor(private messageService: MessageService, private http: HttpClient) {}
  getTickets(): Observable<Ticket[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('TicketService: fetched tickets');
    return of(TICKETS);
  }

  getTicket(id: number): Observable<Ticket> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`TicketService: fetched ticket id=${id}`);
    return of(TICKETS.find(ticket => ticket.id === id));
  }


  // All the Todo methods
  // Get Todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // Delete Todo
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }




}
