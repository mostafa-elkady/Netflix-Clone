import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readmore',
  standalone: true
})
export class ReadmorePipe implements PipeTransform {

  transform(value: string, args: number): any {
    return `${value.substring(0,args)} ...`;
  }

}
