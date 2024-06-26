using Microsoft.AspNetCore.Mvc;
using Showcase_mvc.Services;
using Showcase_mvc.Data;
using Microsoft.AspNetCore.Http;
using Showcase_mvc.Data.Entities; // Include namespace for HttpContext

namespace Showcase_mvc.Controllers
{
    public class MinesweeperController : Controller
    {
        private readonly IMinesweeperService _minesweeperService;
        private readonly ApplicationDbContext _context;
        private readonly HighscoreFunctions _highscoreFunctions= new HighscoreFunctions();




        private const string GameSessionKey = "GameActive";

        public MinesweeperController(IMinesweeperService minesweeperService, ApplicationDbContext context)
        {
            _minesweeperService = minesweeperService;
            _context = context;
            
        }


        public IActionResult RevealCell(int row, int column)
        {
            if (!IsGameActive())
            {
                // Game is not active, handle accordingly (e.g., return an error)
                return Json(new { success = false, message = "Game is not active." });
            }

            var game = _minesweeperService.GetGame();
            int cellValue = game.getValue(row, column);
            return Json(new { success = true, value = cellValue });
        }

        public IActionResult StartNewGame()
        {
            HttpContext.Session.SetInt32(GameSessionKey, 1); // Set game active flag in session
            HttpContext.Session.SetInt32("FlagCount", 0);
            var newGame = _minesweeperService.NewGame();
            int row = newGame.Rows;
            int column = newGame.Columns;
            return Json(new { success = true, rows = row, column = column });
        }

        public IActionResult EndGame()
        {
            HttpContext.Session.Remove(GameSessionKey); // Remove game active flag from session
            return Json(new { success = true });
        }

        private bool IsGameActive()
        {
            return HttpContext.Session.GetInt32(GameSessionKey) == 1;
        }

        public IActionResult AddFlaggedCells(int cellValue)
        {
            int _count = HttpContext.Session.GetInt32("FlagCount") ?? 0; // Retrieve _count from session or default to 0
            if (cellValue == 9)
                _count++;
            HttpContext.Session.SetInt32("FlagCount", _count); // Store _count in session

            if (_count != 5)
                return Json(new { success = false });
            else
            return Json(new { success = true });
        }

        public IActionResult DisplayHighscore(int seconds)
        {
            int _count = HttpContext.Session.GetInt32("FlagCount") ?? 0; // Retrieve _count from session or default to 0

            int score =_highscoreFunctions.CalculateHighscore(_count, seconds);

            
                return Json(new { success = true, score });
        }

        public IActionResult RemoveFlaggedCells(int cellValue)
        {
            int _count = HttpContext.Session.GetInt32("FlagCount") ?? 0; // Retrieve _count from session or default to 0
            if (cellValue == 9)
                _count--;
            HttpContext.Session.SetInt32("FlagCount", _count); // Store _count in session

            return Json(new { success = true });
        }

        public IActionResult AddHighscore(int seconds)
        {
           
            int _count = HttpContext.Session.GetInt32("FlagCount") ?? 0;
            _highscoreFunctions.AddHighscore(_context, _count, seconds);
     

            _highscoreFunctions.SortHighscoresDescending(_context);
            int[] highscores = _highscoreFunctions.GetHighscores(_context);

            // Do something with the highscores array, for example, return it as JSON
            return Json(new { success = true, highscores });
        }
    }
}
