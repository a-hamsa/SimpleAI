using Microsoft.EntityFrameworkCore;
using SimpleAI.Models;

namespace SimpleAI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<History> Histories { get; set; } = null!;
    }
}
    