import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-eco-energy',
  templateUrl: './eco-energy.html',
  styleUrls: ['./eco-energy.css'],
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe],
})
export class EcoEnergy implements OnInit {
  formCalculo!: FormGroup;

  custoDiarioValor: number = 0;
  consumoDiarioValor: number = 0;
  consumoMensalValor: number = 0;
  custoMensalValor: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formCalculo = this.formBuilder.group({
      potencia: [''],
      tempoUso: [''],
      dias: [''],
      custo: [0.85],
    });
  }

  custoDiario(): number {
    const potencia = this.formCalculo.get('potencia')?.value || 0;
    const tempoUso = this.formCalculo.get('tempoUso')?.value || 0;
    const custo = this.formCalculo.get('custo')?.value || 0;

    const consumoDiario = (potencia * tempoUso) / 1000;

    this.custoDiarioValor = consumoDiario * custo;

    return this.custoDiarioValor;
  }

  consumoMensal(): number {
    const potencia = this.formCalculo.get('potencia')?.value || 0;
    const tempoUso = this.formCalculo.get('tempoUso')?.value || 0;
    const dias = this.formCalculo.get('dias')?.value || 0;

    this.consumoMensalValor = (potencia * tempoUso * dias) / 1000;
    return this.consumoMensalValor;
  }

  consumoDiario(): number {
    const potencia = this.formCalculo.get('potencia')?.value || 0;
    const tempoUso = this.formCalculo.get('tempoUso')?.value || 0;

    this.consumoDiarioValor = (potencia * tempoUso) / 1000;
    return this.consumoDiarioValor;
  }

  custoMensal(): number {
    const potencia = this.formCalculo.get('potencia')?.value || 0;
    const tempoUso = this.formCalculo.get('tempoUso')?.value || 0;
    const dias = this.formCalculo.get('dias')?.value || 0;
    const custo = this.formCalculo.get('custo')?.value || 0;

    const consumoMensal = (potencia * tempoUso * dias) / 1000;

    this.custoMensalValor = consumoMensal * custo;

    return this.custoMensalValor;
  }

  executarCalculo(): void {
    this.custoDiario();
    this.consumoDiario();
    this.consumoMensal();
    this.custoMensal();

    const relatorio = {
      consumoDiario: this.consumoDiarioValor,
      consumoMensal: this.consumoMensalValor,
      custoDiario: this.custoDiarioValor,
      custoMensal: this.custoMensalValor,
      potencia: this.formCalculo.get('potencia')?.value,
      tempoUso: this.formCalculo.get('tempoUso')?.value,
      dias: this.formCalculo.get('dias')?.value
    };

    localStorage.setItem('relatorioEnergia', JSON.stringify(relatorio));
  }
}
