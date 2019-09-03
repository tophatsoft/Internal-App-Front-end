import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { $ } from 'protractor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //turns the selected entry into observable and store it in this service
  private selectedEntry = new Subject<any>();
  entrySelected = this.selectedEntry.asObservable();


  constructor(private http: HttpClient) { }
                                      // Condica api
  getEntry(year, month) {
    return this.http.get("http://localhost:54425/api/checkin?year=" + year +"&month=" + month)
  }
  deleteEntry(id) {
    if (confirm("Are you sure you want to delete this day?")) {
      return this.http.delete("http://localhost:54425/api/checkin/" + id).subscribe(res => location.reload())
    }
  }
  //returns entry from component
  selectEntry(entry) {
    this.selectedEntry.next(entry)
    console.log(entry)

  }
  //clock out request
  editEntry(model) {
    return this.http.put("http://localhost:54425/api/checkin/secondEntry", model).subscribe(res => location.reload())
  }

  //clock in request
  addEntry(model) {
    console.log(model)
    return this.http.post("http://localhost:54425/api/checkin/firstEntry", model).subscribe(res => location.reload())
  }
  todayEntry() {
    return this.http.get("http://localhost:54425/api/checkin/todayEntry")
  }

  monthlyHours(year, month) {
    return this.http.get("http://localhost:54425/api/checkin/totalmonth?year=" + year +"&month=" + month )
  }

  yearlyHours(year) {
    return this.http.get("http://localhost:54425/api/checkin/totalyear?year="+year)
  }

  //chat 
  chatUser() {
    return this.http.get("http://localhost:54425/api/userprofile" )
  }

}
