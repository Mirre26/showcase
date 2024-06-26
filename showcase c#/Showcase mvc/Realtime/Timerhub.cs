//using Microsoft.AspNetCore.SignalR;

//namespace Showcase_mvc.Realtime
//{
//    public class Timerhub : Hub
//    {

//        private readonly TimerService _timerService;

//        public Timerhub(TimerService timerService)
//        {
//            _timerService = timerService;
//        }

//        public async Task StartTimer()
//        {
//            await _timerService.StartTimer();
//        }
//    }

//    public class TimerService
//    {
//        private readonly IHubContext<Timerhub> _hubContext;

//        public TimerService(IHubContext<Timerhub> hubContext)
//        {
//            _hubContext = hubContext;
//        }

//        public async Task StartTimer()
//        {
//            // Example: Sending time updates every second
//            while (true)
//            {
//                await Task.Delay(1000); // Delay for 1 second

//                // Send current time to clients
//                await _hubContext.Clients.All.SendAsync("ReceiveTime", DateTime.Now.ToString("HH:mm:ss"));
//            }
//        }
//    }
//}

