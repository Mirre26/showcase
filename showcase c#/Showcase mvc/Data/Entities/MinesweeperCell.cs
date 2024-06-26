namespace Showcase_mvc.Data.Entities
{
    public class MinesweeperCell
    {
        public int Value { get; set; }
        public bool HasFlag { get; set; }
        public bool HasBomb { get; set; }
        public bool Revealed { get; set; }

        public MinesweeperCell() {
        Value = 0;
        HasFlag = false;
        HasBomb = false;
        Revealed = false;
        }
    }
}
