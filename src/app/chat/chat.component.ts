import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AppService } from '../services/app.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;
  private _hubConnection: HubConnection;
  nick={firstName : "guest"};
  message = '';
  messages;

  constructor(private app: AppService) { }

  ngOnInit() {

    // this.app.chatUser().subscribe(res => this.nick = res)

    this._hubConnection = new HubConnectionBuilder().withUrl("http://localhost:54425/chathub").build();

    // message coming from the server
    this._hubConnection.on('sendToAll', data => (this.messages = data, console.log(data)));


    this._hubConnection
      .start()
      .then(() =>
        (

          this._hubConnection.invoke('receiveMessage').catch(err => console.error(err)),
          this._hubConnection.on('receiveMessage', data => this.messages = data,

          ),
          console.log('Connection started!')


        ))
      .catch(err => console.log('Error while establishing connection :('));



  }
  // message sent from the client to the server
  public sendMessage(): void {
    this._hubConnection
      .invoke('sendToAll', this.nick.firstName, this.message)
      .catch(err => console.error(err));
    this.message = '';
    this.viewport.scrollTo({ bottom: 1 });
 

  }


}
