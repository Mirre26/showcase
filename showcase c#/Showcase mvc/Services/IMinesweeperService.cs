using Showcase_mvc.Data.Entities;

namespace Showcase_mvc.Services
{
    public interface IMinesweeperService
    {
        MinesweeperGame GetGame();
        MinesweeperGame NewGame();
    }

    public class MinesweeperService : IMinesweeperService
    {
        private static MinesweeperGame _game;
        private static bool _disposed = false;


        public MinesweeperGame NewGame()
        {

            _game = new MinesweeperGame(5,5,5);
            return _game;
        }
        public MinesweeperGame GetGame()
        {
            int bruh = _game.Rows;
            return _game;
        }
    }
}
