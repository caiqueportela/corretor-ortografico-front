import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { CorrectorService } from './corrector.service';

interface CorrectorWord {
  originalWord: string;
  newWord: string;
  correct: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  words: CorrectorWord[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private correctorService: CorrectorService,
  ) {
    this.form = this.formBuilder.group({
      text: '',
    });
  }

  ngOnInit(): void {
    this.form.get('text')
      ?.valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe(value => {
        console.log(value);
        this.words = [];
        value.split(' ')
          .forEach((word: string) => {
            if (word) {
              this.corrector(word);
            }
          });
      });
  }

  getColor(word: CorrectorWord): string {
    return word.correct ? 'primary' : 'warn';
  }

  corrector(word: string): void {
    this.correctorService
      .corrector(word)
      .subscribe(nWord => {
        this.words.push({
          originalWord: word,
          newWord: nWord,
          correct: (word === nWord),
        });
      })
  }

}
