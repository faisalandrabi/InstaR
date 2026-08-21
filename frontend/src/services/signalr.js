import * as signalR from '@microsoft/signalr';

const HUB_URL = 'http://localhost:5027/notificationHub';

export const createSignalRConnection = () => {
  return new signalR.HubConnectionBuilder()
    .withUrl(HUB_URL, {
      skipNegotiation: false,
      transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .configureLogging(signalR.LogLevel.Warning)
    .build();
};
