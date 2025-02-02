using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleAI.Models;
using SimpleAI.Repositories;
using System.Security.Claims;

namespace SimpleAI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryRepository _historyRepository;

        public HistoryController(IHistoryRepository historyRepository)
        {
            _historyRepository = historyRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserHistories()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var histories = await _historyRepository.GetHistoriesAsync();
            var userHistories = histories.Where(h => h.UserId == userId)
                                         .Select(h => new { h.Message, h.Timestamp });

            return Ok(userHistories);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteHistory(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var history = await _historyRepository.GetHistoryByIdAsync(id);
            if (history == null || history.UserId != userId)
            {
                return NotFound();
            }

            await _historyRepository.DeleteHistoryAsync(id);
            return NoContent();
        }
    }
}
