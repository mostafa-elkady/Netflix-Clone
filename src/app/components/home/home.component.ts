import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { BannerComponent } from "../banner/banner.component";
import { MovieService } from '../../services/movie.service';
import { MovieCarouselComponent } from '../movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../models/IVideoContent';
import { forkJoin, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


// HomeComponent.ts
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeaderComponent, BannerComponent, MovieCarouselComponent, CommonModule]
})
export class HomeComponent {
  constructor(private _Authservice: AuthService, private _MovieService: MovieService) { }

  userToken = JSON.parse(sessionStorage.getItem("userToken")!);
  name = this.userToken.name;
  userProfileImg = this.userToken.picture;
  email = this.userToken.email;
  
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();
  selectedContent: string | null = null;
  movies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[]  = [];
  popularMovies: IVideoContent[]  = [];
  trendingTv: IVideoContent[]  = [];
  upcomingMovies: IVideoContent[]  = [];
  ratedMovies: IVideoContent[]  = [];
  tvShows: IVideoContent[]  = [];
  sources = [
    this._MovieService.getMovies(),
    this._MovieService.getNowPlayingMovies(),
    this._MovieService.getPopularMovies(),
    this._MovieService.getTopRated(),
    this._MovieService.getUpcomingMovies(),
    this._MovieService.getTrendingTv(),
    this._MovieService.getTvShows(),
  ]


  ngOnInit(): void {
    forkJoin(this.sources)
    .pipe(
      map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, trendingTv])=>{
        this.bannerDetail$ = this._MovieService.getBannerDetail(movies.results[2].id);
        this.bannerVideo$ = this._MovieService.getBannerVideo(movies.results[2].id);
        return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, trendingTv}
      })
    ).subscribe((res:any)=>{
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      this.ratedMovies = res.ratedMovies.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
      this.upcomingMovies = res.upcoming.results as IVideoContent[];
      this.popularMovies = res.popular.results as IVideoContent[];
      this.trendingTv = res.trendingTv.results as IVideoContent[];
       this.getMovieKey();
    })
  }
  getMovieKey() {
    this._MovieService.getBannerVideo(this.movies[2].id)
    .subscribe(res=>{
      console.log(res);
    })
  }
  signOut() {
    sessionStorage.removeItem("userToken")
    this._Authservice.signOut();
  }

}
