import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subjectSharedData: Subject<any> = new Subject<any>();

  /**
   * Funtion to read the shared data
   */
  getSharedData$ = this.subjectSharedData.asObservable();

  /**
   * 
   * @param data A function to set shared data
   */
  setSharedData(data: any): void {
    this.subjectSharedData.next(data);
  }
}
