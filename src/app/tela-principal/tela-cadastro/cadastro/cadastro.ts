import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {
  formulario!: FormGroup;
  localStorage: Storage = window.localStorage;
  usuario!: Usuario;
  valido: boolean = false;
  validacaoSenha: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nomeCompleto: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
    });
    this.validacoesCampo();
  }

  enviarFormulario(): void {
    const senha = this.formulario.get('senha')?.value;
    const confirmarSenha = this.formulario.get('confirmarSenha')?.value;

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
      return;
    }

    if (this.formulario.valid) {
      this.usuario = {
        id: Date.now(),
        nome: this.formulario.get('nomeCompleto')?.value,
        email: this.formulario.get('email')?.value,
        senha: this.formulario.get('senha')?.value,
      };

      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    }
  }

  validacoesCampo() {
    const userCadastrado = localStorage.getItem('usuario');
    this.formulario.get('email')?.valueChanges.subscribe((valor) => {
      if (valor === JSON.parse(userCadastrado || '{}').email) {
        this.valido = true;
        this.formulario.get('email')?.setValue('');
      }
    });
  }
}
