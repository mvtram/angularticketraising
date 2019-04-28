import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { TICKETS } from '../mock-tickets';
import { TicketService } from '../ticket.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent {
  todos: Todo[];
model = {
    left: true,
    middle: false,
    right: false
  };
  title: string;
  tickets = TICKETS;
  selectedTicket: Ticket;
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    // this.getTickets();
    this.ticketService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // Remove From UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Remove from server
    this.ticketService.deleteTodo(todo).subscribe();
  }
  addTodo(todo: Todo) {
    this.ticketService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }


  // Tickets add and delete method
  /*
  getTickets(): void {
    this.ticketService.getTickets()
      .subscribe(tickets => this.tickets = tickets);
  }
  onSelect(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }
  */
}
