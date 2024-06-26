using Microsoft.AspNetCore.SignalR;
using Showcase_mvc.Data;
using Showcase_mvc.Data.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;

namespace Showcase_mvc.Realtime
{
    public class Chathub : Hub
    {
       
        private readonly ApplicationDbContext _context;
        private readonly HighscoreFunctions _highscoreFunctions = new HighscoreFunctions();


        // Constructor to initialize TimerService
        public Chathub(ApplicationDbContext context)
        {
            
            _context = context;
                
        }


        public async Task SendMessage()
        {
            
            await Clients.All.SendAsync("ReceiveMessage", _highscoreFunctions.GetHighscores(_context));
        }

    }

}
