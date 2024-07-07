import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  constructor(private _DomSanitizer:DomSanitizer){}
@Input({ required: true }) bannerTitle: string = '';
@Input({ required: true }) bannerOverview: string = '';
@Input({ required: true }) key: string = 'r_pUE7OcN8w';
videoUrl = this._DomSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`)

ngOnChanges(changes: SimpleChanges): void {
  if(changes['key']){
    this.videoUrl = this._DomSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
  }
}

}
