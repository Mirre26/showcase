using Showcase_mvc.Services;

namespace Showcase_mvc.Data.Entities
{
    public class MinesweeperGame
    {
        private readonly IMinesweeperService _minesweeperService;
        public MinesweeperCell[,] Board { get; set; }
        public int Rows { get; } = 5;
        public int Columns { get; } = 5;
        public int TotalBombs { get; } = 5;

        public MinesweeperGame(IMinesweeperService minesweeperService)
        {
            _minesweeperService = minesweeperService;
           
        }
        public MinesweeperGame(int rows, int colums, int totalBombs)
        {
            Rows = rows;
            Columns = colums;
            TotalBombs = totalBombs;
            InitializeBoard();
        }

        private void InitializeBoard()
        {
            Board = new MinesweeperCell[Rows, Columns];

            // Initialize all cells with default values
            for (int i = 0; i < Rows; i++)
            {
                for (int j = 0; j < Columns; j++)
                {
                    Board[i, j] = new MinesweeperCell();
                }
            }

            // Randomly place bombs on the board
            Random random = new Random();
            int bombsPlaced = 0;
            while (bombsPlaced < TotalBombs)
            {
                int randomRow = random.Next(0, Rows);
                int randomColumn = random.Next(0, Columns);

                if (!Board[randomRow, randomColumn].HasBomb)
                {
                    Board[randomRow, randomColumn].HasBomb = true;
                    Board[randomRow, randomColumn].Value = 9;
                    bombsPlaced++;
                }
            }

            // Calculate adjacent bomb counts for each cell
            for (int i = 0; i < Rows; i++)
            {
                for (int j = 0; j < Columns; j++)
                {
                    if (!Board[i, j].HasBomb)
                    {
                        Board[i, j].Value = CountAdjacentBombs(i, j);
                    }
                }
            }
        }
        public int getValue(int row, int col)
        {
            return Board[row, col].Value;
        }


        public int CountAdjacentBombs(int row, int column)
        {

            int bombCount = 0;
            for (int i = row - 1; i <= row + 1; i++)
            {
                for (int j = column - 1; j <= column + 1; j++)
                {
                    if (i >= 0 && i < Rows && j >= 0 && j < Columns && Board[i, j].HasBomb)
                    {
                        bombCount++;
                    }
                }
            }
            return bombCount;
        }


    }
}