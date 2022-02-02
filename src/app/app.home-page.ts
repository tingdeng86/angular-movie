import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-home-page',
    templateUrl: 'app.home-page.html',
    styleUrls: ['./app.home-page.css']
})
export class HomePageComponent {
    _movieArray!: Array<any>;
    _genreArray!: Array<any>;
    _http: HttpClient;
    selectedGenre: number = 16;
    page: number = 1;
    totalPages: number = 1;
    API_KEY = "d6441bcd0c7210bd6baec2676da16bd1"; // Use v3

    GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
        + this.API_KEY
        + '&language=en-US';

    constructor(private http: HttpClient) {
        this._http = http;
    }

    ngOnInit() {
        this.getDateRange();
        this.getMovies();
        this.getGenres();
    }
    selected() {
        this.page = 1
        // console.log(this.selectedGenre)
        this.getMovies()

    }
    nextPage() {
        this.page += 1;
        this.getMovies()
    }
    previousPage() {
        this.page -= 1;
        this.getMovies()
    }
    getDateRange() {
        let thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return thirtyDaysAgo
    }

    getFormattedDate(dt: Date) {
        let pipe = new DatePipe('en-US')
        const now = dt
        return pipe.transform(now, 'YYYY-MM-dd')
    }

    getMovies() {
        let BASE_URL = 'http://api.themoviedb.org/3/discover/movie?api_key='
            + this.API_KEY
            + `&primary_release_date.gte=${this.getFormattedDate(this.getDateRange())}`
            + `&primary_release_date.lte=${this.getFormattedDate(new Date())}`
            + `&page=${this.page}&with_genres=${this.selectedGenre}`;
        this._http.get<any>(BASE_URL)
            .subscribe({
                next: (data) => {
                    let page = data.page;
                    this.totalPages = data.total_pages;
                    console.log("Page number: " + page
                        + " Total Pages: " + this.totalPages);
                    this._movieArray = data.results;
                    // console.log(this._movieArray);
                    // console.log(BASE_URL)
                },
                error: (er) => {
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
                    alert(er);
                    console.error(er)
                }
            });
    }
}
