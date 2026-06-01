import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorios-component',
  standalone: true,
  imports: [],
  templateUrl: './relatorios-component.html',
  styleUrl: './relatorios-component.css',
})
export class RelatoriosComponent implements OnInit {

  periodo = 'Mês Atual';

  cardsResumo: any[] = [];

  consumoPorEquipamento: any[] = [];

  equipamentos: any[] = [];

  ngOnInit(): void {
    const dados = localStorage.getItem('relatorioEnergia');

    if (!dados) {
      return;
    }

    const relatorio = JSON.parse(dados);

    this.cardsResumo = [
      {
        titulo: 'Consumo Total',
        valor: `${relatorio.consumoMensal.toFixed(2)} kWh`,
        descricao: 'Consumo mensal calculado',
        icone: '⚡',
        cor: 'azul',
      },
      {
        titulo: 'Custo Total',
        valor: `R$ ${relatorio.custoMensal.toFixed(2)}`,
        descricao: 'Gasto mensal estimado',
        icone: '$',
        cor: 'verde',
      },
      {
        titulo: 'Média Diária',
        valor: `${relatorio.consumoDiario.toFixed(2)} kWh`,
        descricao: 'Consumo diário',
        icone: '◔',
        cor: 'roxo',
      },
      {
        titulo: 'Potência',
        valor: `${relatorio.potencia} W`,
        descricao: 'Equipamento analisado',
        icone: '↗',
        cor: 'laranja',
      },
    ];

    this.consumoPorEquipamento = [
      {
        nome: 'Equipamento',
        percentual: '100%',
        consumo: `${relatorio.consumoMensal.toFixed(2)} kWh`,
        cor: 'verde-legenda',
      },
    ];

    this.equipamentos = [
      {
        nome: 'Equipamento Analisado',
        consumo: relatorio.consumoMensal.toFixed(2),
        custo: relatorio.custoMensal.toFixed(2),
        usoDiario: `${relatorio.tempoUso} h`,
      },
    ];
  }

  exportarRelatorio() {
    window.print();
  }

  visualizarEquipamento(nomeEquipamento: string) {
    alert(`Visualizando detalhes de: ${nomeEquipamento}`);
  }
}
