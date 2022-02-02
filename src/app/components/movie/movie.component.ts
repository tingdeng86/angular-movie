import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  baseImageUrl = "https://image.tmdb.org/t/p/w300";
  @Input() title!: any;
  @Input() release_date!: any;
  @Input() vote_average!: any;
  @Input() overview!: any;
  @Input() poster_path!: any;
 
  ngOnInit(): void {
  }

}
