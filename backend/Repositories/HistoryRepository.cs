using SimpleAI.Data;
using Microsoft.EntityFrameworkCore;

namespace SimpleAI.Repositories
{
    public class HistoryRepository : IHistoryRepository
    {
        private readonly ApplicationDbContext _context;

        public HistoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<History>> GetHistoriesAsync()
        {
            return await _context.Histories.ToListAsync();
        }

        public async Task<History> GetHistoryByIdAsync(int id)
        {
            var history = await _context.Histories.FindAsync(id);
            if (history == null)
            {
                throw new KeyNotFoundException($"History with id {id} not found.");
            }
            return history;
        }

        public async Task AddHistoryAsync(History history)
        {
            _context.Histories.Add(history);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateHistoryAsync(History history)
        {
            _context.Entry(history).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteHistoryAsync(int id)
        {
            var history = await _context.Histories.FindAsync(id);
            if (history != null)
            {
                _context.Histories.Remove(history);
                await _context.SaveChangesAsync();
            }
        }
    }

    public interface IHistoryRepository
    {
        Task<IEnumerable<History>> GetHistoriesAsync();
        Task<History> GetHistoryByIdAsync(int id);
        Task AddHistoryAsync(History history);
        Task UpdateHistoryAsync(History history);
        Task DeleteHistoryAsync(int id);
    }
}
