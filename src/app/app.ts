import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Principal } from './tela-principal/principal/principal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Principal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('eco-rota');
}
