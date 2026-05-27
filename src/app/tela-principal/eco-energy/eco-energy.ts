import { Component } from '@angular/core';

@Component({
  selector: 'app-eco-energy',
  templateUrl: './eco-energy.html',
  styleUrls: ['./eco-energy.css'],
})
export class EcoEnergy {
  // Lista de aparelhos pré-cadastrados (mesma ordem/ids do template)
  appliances = [
    { id: 'geladeira', name: 'Geladeira', power: 150, icon: '🧊' },
    { id: 'ar-condicionado', name: 'Ar-condicionado', power: 1200, icon: '❄️' },
    { id: 'chuveiro', name: 'Chuveiro Elétrico', power: 4500, icon: '🚿' },
    { id: 'tv', name: 'Televisão', power: 120, icon: '📺' },
    { id: 'lavadora', name: 'Máquina de Lavar', power: 500, icon: '🧺' },
    { id: 'microondas', name: 'Micro-ondas', power: 1000, icon: '🍽️' },
    { id: 'computador', name: 'Computador', power: 200, icon: '💻' },
    { id: 'ventilador', name: 'Ventilador', power: 60, icon: '🌀' },
    { id: 'lampada', name: 'Lâmpada', power: 9, icon: '💡' },
    { id: 'forno', name: 'Forno Elétrico', power: 2000, icon: '🔥' },
  ];

  // Tarifa padrão
  tarifa: number = 0.75;

  // Itens selecionados (ligado ao template via *ngFor)
  selectedItems: Array<{ id: string; app: any; hours: number; days: number; monthly: number; cost: number }> = [];

  // Computed UI state
  totalKwh = 0;
  totalCost = 0;
  topConsumer: string | null = null;
  pieStyle = '';
  barEntries: Array<{ name: string; pct: number }> = [];

  private counter = 0;

  addAppliance(app: any) {
    this.counter++;
    const id = `sel-${this.counter}`;
    const item = { id, app, hours: 1, days: 30, monthly: 0, cost: 0 } as any;
    // calculate initial values
    this.updateItem(item);
    this.selectedItems.push(item);
    this.recalculateAll();
  }

  removeSelected(item: any) {
    this.selectedItems = this.selectedItems.filter((s) => s.id !== item.id);
    this.recalculateAll();
  }

  clearAll() {
    this.selectedItems = [];
    this.recalculateAll();
  }

  onHoursChange(item: any, value: any) {
    item.hours = Math.max(0, Number(value) || 0);
    this.updateItem(item);
    this.recalculateAll();
  }

  onDaysChange(item: any, value: any) {
    item.days = Math.max(0, Number(value) || 0);
    this.updateItem(item);
    this.recalculateAll();
  }

  onTarifaChange(value: any) {
    this.tarifa = Number(value) || 0;
    this.recalculateAll();
  }

  private updateItem(item: any) {
    const daily = this.calcDaily(item.app.power, item.hours);
    const monthly = this.calcMonthly(daily, item.days);
    item.monthly = monthly;
    item.cost = this.calcCost(monthly, this.tarifa);
  }

  private recalculateAll() {
    // ensure each item's cost is updated with current tarifa
    this.selectedItems.forEach((it) => (it.cost = this.calcCost(it.monthly, this.tarifa)));

    this.totalKwh = this.selectedItems.reduce((s, it) => s + (it.monthly || 0), 0);
    this.totalCost = this.selectedItems.reduce((s, it) => s + (it.cost || 0), 0);

    // top consumer
    if (this.selectedItems.length > 0) {
      const top = this.selectedItems.reduce((best: any, it: any) => (!best || it.monthly > best.monthly ? it : best), null);
      this.topConsumer = top ? top.app.name : null;
    } else {
      this.topConsumer = null;
    }

    // build pie gradient
    const total = this.totalKwh || 0;
    if (total <= 0) {
      this.pieStyle = 'conic-gradient(var(--panel-bg), var(--panel-bg))';
      this.barEntries = [];
      return;
    }

    let acc = 0;
    const segments: string[] = [];
    const colors = ['var(--accent)', 'var(--accent-2)', 'var(--verde-pastel)', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.03)'];
    this.selectedItems.forEach((it, idx) => {
      const percent = total <= 0 ? 0 : (it.monthly / total) * 100;
      const start = acc;
      acc += percent;
      const end = acc;
      const color = colors[idx % colors.length];
      segments.push(`${color} ${start * 3.6}deg ${end * 3.6}deg`);
    });

    this.pieStyle = `conic-gradient(${segments.join(',')})`;

    // bar entries normalized to max
    const max = Math.max(...this.selectedItems.map((it) => it.monthly), 1);
    this.barEntries = this.selectedItems.map((it) => ({ name: it.app.name, pct: Math.round((it.monthly / max) * 100) }));
  }

  /* Calculation helpers */
  calcDaily(powerW: number, hours: number) {
    return (powerW * (hours || 0)) / 1000;
  }
  calcMonthly(dailyKwh: number, days: number) {
    return (dailyKwh || 0) * (days || 0);
  }
  calcCost(monthlyKwh: number, tariff: number) {
    return (monthlyKwh || 0) * (tariff || 0);
  }

  // exposed for template
  round(v: number) {
    if (!isFinite(v)) return 0;
    return Math.round(v * 100) / 100;
  }

  formatCurrency(v: number, locale = 'pt-BR') {
    try {
      return v.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (e) {
      return (Math.round((v || 0) * 100) / 100).toFixed(2);
    }
  }
}
