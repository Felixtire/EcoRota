import { Component } from '@angular/core';

@Component({
  selector: 'app-relatorios-component',
  imports: [],
  templateUrl: './relatorios-component.html',
  styleUrl: './relatorios-component.css',
})
export class RelatoriosComponent {
  // Período exibido no botão superior da tela
  periodo = '01/05/2026 - 26/05/2026';

  // Cards principais do topo da tela
  cardsResumo = [
    {
      titulo: 'Consumo Total',
      valor: '1.250,50 kWh',
      descricao: 'No período selecionado',
      icone: '⚡',
      cor: 'azul',
    },
    {
      titulo: 'Custo Total',
      valor: 'R$ 1.062,93',
      descricao: 'No período selecionado',
      icone: '$',
      cor: 'verde',
    },
    {
      titulo: 'Média Diária',
      valor: '50,02 kWh',
      descricao: 'Consumo médio por dia',
      icone: '◔',
      cor: 'roxo',
    },
    {
      titulo: 'Equipamentos',
      valor: '12',
      descricao: 'Total de equipamentos',
      icone: '↗',
      cor: 'laranja',
    },
  ];

  // Dados da legenda do gráfico de consumo por equipamento
  consumoPorEquipamento = [
    {
      nome: 'Ar Condicionado',
      percentual: '35%',
      consumo: '437,68 kWh',
      cor: 'verde-legenda',
    },
    {
      nome: 'Iluminação LED',
      percentual: '25%',
      consumo: '312,63 kWh',
      cor: 'azul-legenda',
    },
    {
      nome: 'Computadores',
      percentual: '20%',
      consumo: '250,10 kWh',
      cor: 'roxo-legenda',
    },
    {
      nome: 'Equipamentos de Escritório',
      percentual: '10%',
      consumo: '125,05 kWh',
      cor: 'laranja-legenda',
    },
    {
      nome: 'Outros',
      percentual: '10%',
      consumo: '125,04 kWh',
      cor: 'cinza-legenda',
    },
  ];

  // Dados da tabela inferior
  equipamentos = [
    {
      nome: 'Ar Condicionado',
      consumo: '437,68',
      custo: '372,03',
      usoDiario: '17,51 kWh',
    },
    {
      nome: 'Iluminação LED',
      consumo: '312,63',
      custo: '265,74',
      usoDiario: '12,51 kWh',
    },
    {
      nome: 'Computadores',
      consumo: '250,10',
      custo: '212,59',
      usoDiario: '10,00 kWh',
    },
  ];

  // Função temporária para o botão de exportar
  exportarRelatorio() {
    alert('Função de exportação será implementada posteriormente.');
  }

  // Função temporária para o botão de visualizar
  visualizarEquipamento(nomeEquipamento: string) {
    alert(`Visualizando detalhes de: ${nomeEquipamento}`);
  }
}