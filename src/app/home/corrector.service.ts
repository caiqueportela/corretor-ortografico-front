import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorrectorService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  public corrector(word: string): Observable<string> {
    return this.httpClient
      .post<any>(`http://localhost:5001/corrector/${word}`, {})
      .pipe(
        take(1),
        map(data => data.possible_words)
      );
  }

}
