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
                                        .OrderByDescending(h => h.Timestamp)
                                        .Select(h => new { 
                                            h.Id, 
                                            h.Message, 
                                            h.Question, 
                                            h.Timestamp,
                                            Key = $"history-{h.Id}-{h.Timestamp.Ticks}" // Add a guaranteed unique key
                                        });

            return Ok(userHistories);
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteHistory([FromRoute] int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new { message = "Invalid history ID" });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User not authenticated" });
                }

                var history = await _historyRepository.GetHistoryByIdAsync(id);
                if (history == null)
                {
                    return NotFound(new { message = "History not found" });
                }

                if (history.UserId != userId)
                {
                    return Forbid();
                }

                await _historyRepository.DeleteHistoryAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
