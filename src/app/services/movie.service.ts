import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// ?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc
const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjNlMmRhMjI5MGYwYzI5NWRmMTEyNTk2NWYwZWIxZCIsIm5iZiI6MTcyMDI5MDEyNC41MTAwMzYsInN1YiI6IjY1MmQ4ZmYzYTgwMjM2MDExYWM2ZmFmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tsjSo2_dZ2Xb9YuGXubrECdB360igoMYWBOw351SdkI'
  }
};
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _HttpClient: HttpClient) { }
  url = 'https://api.themoviedb.org/3';
  getMovies():Observable<any>{
    return this._HttpClient.get(`${this.url}/discover/movie`, options);  // returns an Observable
  }
  getTvShows():Observable<any> {
    return this._HttpClient.get(`${this.url}/discover/tv`, options)
  }

  getTrendingTv():Observable<any> {
    return this._HttpClient.get(`${this.url}/trending/tv/day`, options)
  }

  getBannerImage(id: number):Observable<any> {
    return this._HttpClient.get(`${this.url}/movie/${id}/images`, options)
  }

  getBannerVideo(id: number):Observable<any> {
    return this._HttpClient.get(`${this.url}/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number):Observable<any> {
    return this._HttpClient.get(`${this.url}/movie/${id}`, options);
  }

  getNowPlayingMovies():Observable<any> {
    return this._HttpClient.get(`${this.url}/movie/now_playing`, options)
  }

  getPopularMovies():Observable<any> {
    return this._HttpClient.get(`${this.url}/movie/popular`, options)
  }

  getTopRated() :Observable<any>{
    return this._HttpClient.get(`${this.url}/movie/top_rated`, options)
  }

  getUpcomingMovies():Observable<any> {
    return this._HttpClient.get(`${this.url}/movie/upcoming`, options)
  }
}
