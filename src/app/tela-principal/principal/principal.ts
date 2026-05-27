import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principal',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {}
