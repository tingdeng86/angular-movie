import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  _movieArray!: Array<any>;
  _genreArray!: Array<any>;
  _http: HttpClient;
  selectedGenre!: number;
  API_KEY = "d6441bcd0c7210bd6baec2676da16bd1"; // Use v3
  

  GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
    + this.API_KEY
    + '&language=en-US';
  BASE_URL = 'http://api.themoviedb.org/3/discover/movie?api_key='
  + this.API_KEY

  + `&primary_release_date.gte=${this.getFormattedDate(this.getDateRange())}`
  + `&primary_release_date.lte=${this.getFormattedDate(new Date())}`


  + `&page=1&with_genres=16`;



  // Since we are using a provider above we can receive 
  // an instance through an instructor.
  constructor(private http: HttpClient) {
    this._http = http;


  }

  ngOnInit() {

    this.getDateRange();
    this.getMovies();
    this.getGenres();
  }
  selected(){
    console.log(this.selectedGenre)
    this.BASE_URL = 'http://api.themoviedb.org/3/discover/movie?api_key='
    + this.API_KEY
    + `&primary_release_date.gte=${this.getFormattedDate(this.getDateRange())}`
    + `&primary_release_date.lte=${this.getFormattedDate(new Date())}`
    + `&page=1&with_genres=${this.selectedGenre}`;
    this.getMovies()
    
  }
  getDateRange() {

    let sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 30);
    return sixtyDaysAgo
  }

  // Hint.
  // Months and days less than 10 you may want to 
  // create some kind of string formater that appends a 0 
  // before the day or month number.
  getFormattedDate(dt: Date) {
    // alert("Current Day: " + dt.getDate() 

    //     + " Month: " + (Number(dt.getMonth()) + 1) 
    //     + " Year: "  + dt.getFullYear());
    let pipe = new DatePipe('en-US')
    const now = dt
    return pipe.transform(now, 'YYYY-MM-dd')
  }

  

  getMovies() {
    this._http.get<any>(this.BASE_URL)
      .subscribe({
        next: (data) => {
          let page = data.page;
          let totalPages = data.total_pages;
          console.log("Page number: " + page
            + " Total Pages: " + totalPages);

          this._movieArray = data.results;
          console.log(this._movieArray);
          console.log(this.BASE_URL)
        },
        error: (er) => {
          // Let user know about the error.
          alert(er);
          console.error(er);
        }
      });
  }

  getGenres() {
    this._http.get<any>(this.GENRE_URL)
      .subscribe({
        next: (data) => {
          this._genreArray = data.genres;
          console.log(JSON.stringify(this._genreArray));
        },
        error: (er) => {
          // Let user know about the error.
          alert(er);
          console.error(er)
        }
      });
  }
}
