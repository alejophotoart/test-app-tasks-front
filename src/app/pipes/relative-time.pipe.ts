import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { inject, LOCALE_ID } from '@angular/core';

@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {
  private locale = inject(LOCALE_ID);

  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    
    try {
      const date = new Date(value as string);
      if (isNaN(date.getTime())) {
        console.error('Fecha inválida:', value);
        return '';
      }

      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // Si es hoy, mostrar la hora en formato 12 horas
      if (this.isToday(date)) {
        return formatDate(date, 'hh:mm a', this.locale);
      }

      // Si fue ayer
      if (this.isYesterday(date)) {
        return 'Ayer';
      }

      // Si fue esta semana
      if (diffDays < 7) {
        return this.getDayName(date);
      }

      // Si fue la semana pasada
      if (diffDays < 14) {
        return 'La semana pasada';
      }

      // Si fue este mes
      if (this.isSameMonth(date)) {
        return `Hace ${diffDays} días`;
      }

      // Si fue el mes pasado
      if (this.isLastMonth(date)) {
        return 'El mes pasado';
      }

      // Si fue hace más de un mes pero menos de un año
      const diffMonths = this.getMonthDifference(date, now);
      if (diffMonths < 12) {
        return `Hace ${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`;
      }

      // Si fue hace más de un año
      const diffYears = now.getFullYear() - date.getFullYear();
      return `Hace ${diffYears} ${diffYears === 1 ? 'año' : 'años'}`;
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return '';
    }
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  private isYesterday(date: Date): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();
  }

  private getDayName(date: Date): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  }

  private isSameMonth(date: Date): boolean {
    const now = new Date();
    return date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  }

  private isLastMonth(date: Date): boolean {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    return date.getMonth() === lastMonth.getMonth() &&
      date.getFullYear() === lastMonth.getFullYear();
  }

  private getMonthDifference(date1: Date, date2: Date): number {
    return (date2.getFullYear() - date1.getFullYear()) * 12 +
      date2.getMonth() - date1.getMonth();
  }
}
