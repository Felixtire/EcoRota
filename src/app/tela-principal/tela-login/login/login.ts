import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { inject } from 'vitest';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router) {
  }
  protected direcionarParaPrincipal() {
    this.router.navigate(['/principal']);


  }
}
