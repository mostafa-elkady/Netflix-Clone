import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../models/IVideoContent';
import { ReadmorePipe } from '../../pipes/readmore.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [NgFor, NgIf, ReadmorePipe, ImagePipe],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.scss',
  animations: [
    trigger("fade", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate("1s ease-in-out", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements AfterViewInit {
  selectedContent: string | null = null;
  @Input() videoContent: IVideoContent[] = [];
  @Input() title!: string;
  ngAfterViewInit(): void {
    this.initSwiper();
  }
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }
    })
  }
  clearHoverMovie() {
    this.selectedContent = null;
  }
  setHoverMovie(movie: IVideoContent) {
    this.selectedContent = movie.title ?? movie.name;
  }
}
