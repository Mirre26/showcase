using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using NUnit.Framework.Legacy;
using Showcase_mvc;
using Showcase_mvc.Data;
using Showcase_mvc.Data.Entities;
using Showcase_mvc.Services;
using System.Diagnostics.Eventing.Reader;

namespace MinesweeperTests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void ConstructGameWithMock()
        {
            // Arrange
            Mock<IMinesweeperService> mock = new Mock<IMinesweeperService>();
            MinesweeperGame expectedGame = new MinesweeperGame(5, 5, 5); // Create an expected game instance

            // Set up the behavior of the mock to return the expected game when NewGame is called
            mock.Setup(m => m.NewGame()).Returns(expectedGame);

            if (mock.Object != null)
            {
                Assert.Pass();
            }
            else
            {
                Assert.Fail();
            }
            // Set up the behavior of the mock to return the same expected game when GetGame is called

        }
        [Test]
        public void GetGameWithMock()
        {
            // Arrange
            Mock<IMinesweeperService> mock = new Mock<IMinesweeperService>();
            MinesweeperGame expectedGame = new MinesweeperGame(5, 5, 5); // Create an expected game instance


            mock.Setup(m => m.NewGame()).Returns(expectedGame);
            mock.Setup(m => m.GetGame()).Returns(expectedGame);


            // Act
            var gameService = mock.Object;
            var newGame = gameService.NewGame();
            var game = gameService.GetGame(); // Call GetGame() to obtain the game

            // Assert
            if (newGame == game)
            {
                Assert.Pass();
            }
            else
            {
                Assert.Fail();
            }
        }

        [Test]
        public void AddHighscore_ShouldAddHighscoreToDatabase()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlite(connection)
                .Options;

            // Ensure the database is created
            using (var context = new ApplicationDbContext(options))
            {
                context.Database.EnsureCreated();
            }

            // Use the DbContext with the SQLite connection
            using (var context = new ApplicationDbContext(options))
            {
                var highscoreFunctions = new HighscoreFunctions();

                // Act
                highscoreFunctions.AddHighscore(context, 10, 20);

               
                // Assert
                if (context.Highscores.Count() == 1)
                {
                    Assert.Pass();
                }
                else
                {
                    Assert.Fail();
                }

            }
        }

    }
}
