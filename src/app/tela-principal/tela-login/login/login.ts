import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  formularioLogin!: FormGroup
  usuario!: Usuario;

  constructor(private router: Router, private fb : FormBuilder) {
  }
  protected direcionarParaPrincipal() {
    this.router.navigate(['/principal']);


  }
  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['',Validators.required]
    })
  }

  realizarLogin(){

    const email = this.formularioLogin.get('email');
    const senha = this.formularioLogin.get('senha');

    const usuarioCadastrado = localStorage.getItem('usuario');


    if (usuarioCadastrado) {
      const usuario = JSON.parse(usuarioCadastrado);

      if (email?.value === usuario.email && senha?.value === usuario.senha) {
        alert('Login realizado com sucesso!');
        this.router.navigate(['/principal']);
      } else {
        alert('Email ou senha incorretos. Por favor, tente novamente.');
      }
    }





  }


}
