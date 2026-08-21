using Microsoft.AspNetCore.SignalR;
using backEnd.Models;

namespace backEnd.Hubs;

public class NotificationHub : Hub
{
    public async Task ReceiveUserUpdate(User user)
    {
        await Clients.All.SendAsync("ReceiveUserUpdate", user);
    }

    public async Task ReceiveRoleUpdate(Role role)
    {
        await Clients.All.SendAsync("ReceiveRoleUpdate", role);
    }
}