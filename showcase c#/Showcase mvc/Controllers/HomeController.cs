using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Showcase_mvc.Models;
using Showcase_mvc.Services;
using System.Diagnostics;

namespace Showcase_mvc.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IMinesweeperService _minesweeperService;

        public HomeController(ILogger<HomeController> logger, IMinesweeperService minesweeperService)
        {
            _logger = logger;
            _minesweeperService = minesweeperService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        public IActionResult Game()
        {
            return View();
        }

        [Authorize(Policy = "Manager")]
        public IActionResult AdminPage()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}