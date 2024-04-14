import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from '../../enum/datastate.enum';
import { CustomHttpResponse, Page } from '../../interface/appstates';
import { State } from '../../interface/state';
import { User } from '../../interface/user';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.css']
})
export class NewcustomerComponent implements OnInit {
  newCustomerState$: Observable<State<CustomHttpResponse<Page & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page & User>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = DataState;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.newCustomerState$ = this.customerService.customers$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error })
        })
      )
  }

  createCustomer(newCustomerForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.newCustomerState$ = this.customerService.newCustomers$(newCustomerForm.value)
      .pipe(
        map(response => {
          console.log(response);
          newCustomerForm.reset({ type: 'INDIVIDUAL', status: 'ACTIVE' });
          this.isLoadingSubject.next(false);
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({ dataState: DataState.LOADED, error })
        })
      )
  }

}
