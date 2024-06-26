using System.Linq;

namespace Showcase_mvc.Data.Entities
{
    public class HighscoreFunctions
    {
        public void AddHighscore(ApplicationDbContext context, int count, int seconds)
        {
            // Calculate highscore
            int highscore = CalculateHighscore(count, seconds);

            // Create a new Highscore object
            var newHighscore = new Highscore
            {
                highscore = highscore
            };

            // Add the new highscore to the context
            context.Highscores.Add(newHighscore);

            // Delete lowest highscore if there are more than 15 entries
            if (context.Highscores.Count() > 15)
            {
                var lowestHighscore = context.Highscores.OrderBy(h => h.highscore).First();
                context.Highscores.Remove(lowestHighscore);
                if (newHighscore != lowestHighscore)
                {
                    context.SaveChanges();
                }
            } else
            {
                context.SaveChanges();
            }

            // Save changes to the database
           
        }

        public void SortHighscoresDescending(ApplicationDbContext context)
        {
            var highscores = context.Highscores.OrderByDescending(h => h.highscore).ToList();

            // Clear existing entries
            context.Highscores.RemoveRange(context.Highscores);

            // Add sorted highscores back to the context
            foreach (var highscore in highscores)
            {
                context.Highscores.Add(highscore);
            }

            // Save changes to the database
           
        }

        public int[] GetHighscores(ApplicationDbContext context)
        {
            // Retrieve highscores from the database and order them in descending order
            var highscores = context.Highscores.OrderByDescending(h => h.highscore).ToList();

            // Extract highscore values and store them in an array
            int[] highscoreArray = highscores.Select(h => h.highscore).ToArray();

            // Return the array of highscores
            return highscoreArray;
        }

        public int CalculateHighscore(int count, int seconds)
        {
            // Ensure count is at least 1
            count = Math.Max(count, 0);

            // Ensure seconds is at least 1
            seconds = Math.Max(seconds, 1);

            // Calculate the weighted score based on count and seconds
            // Adjust the weight of count and seconds based on your preference
            double weightedScore = (count * 500) + (400 - seconds);

            // Cap the score at a maximum value
            int maxScore = 10000; // You can adjust this value as needed
            return Math.Min((int)weightedScore, maxScore);
        }
    }
}
