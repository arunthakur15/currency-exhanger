import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subjectSharedData: Subject<any> = new Subject<any>();
  getSharedData$ = this.subjectSharedData.asObservable();

  setSharedData(data: any): void {
    this.subjectSharedData.next(data);
  }
}
