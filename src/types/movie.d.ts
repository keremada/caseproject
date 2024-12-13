export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
    imdbRating?: string;
  }
  
 export interface MovieDetails {
    Title: string;
    Year: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Language: string;
    Country: string;
    Awards: string;
    BoxOffice?: string;
    totalSeasons?: string; 
  }