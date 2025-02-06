using Azure;
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SimpleAI.Repositories;
using SimpleAI.Models;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenAiController : ControllerBase
    {
        private readonly OpenAIClient _client;
        private readonly IHistoryRepository _historyRepository;

        public OpenAiController(IHistoryRepository historyRepository)
        {
            string? endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT");
            if (string.IsNullOrEmpty(endpoint))
                throw new InvalidOperationException("Environment variable 'AZURE_OPENAI_ENDPOINT' is not set.");

            // Use DefaultAzureCredential for Entra ID Authentication
            _client = new OpenAIClient(new Uri(endpoint), new DefaultAzureCredential());

            // Uncomment below for Key Authentication
            string? key = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY");
            if (!string.IsNullOrEmpty(key))
            {
                _client = new OpenAIClient(new Uri(endpoint), new AzureKeyCredential(key));
            }

            _historyRepository = historyRepository;
        }

        [HttpPost("complete")]
        [Authorize]
        public async Task<IActionResult> GenerateCompletion([FromBody] PromptRequest request)
        {
            if (string.IsNullOrEmpty(request.Prompt))
                return BadRequest(new { error = "Prompt cannot be null or empty." });

            try
            {
                var completionsOptions = new CompletionsOptions
                {
                    Prompts = { request.Prompt },
                    MaxTokens = 2000,
                    Temperature = 1.0f,
                    FrequencyPenalty = 0.5f,
                    PresencePenalty = 1.0f
                };

                var completionsResponse = await _client.GetCompletionsAsync("babbage-002", completionsOptions);

                string completionText = completionsResponse.Value.Choices[0].Text;

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId != null)
                {
                    var history = new History
                    {
                        UserId = userId,
                        Question = request.Prompt,
                        Message = completionText,
                        Timestamp = DateTime.UtcNow
                    };
                    await _historyRepository.AddHistoryAsync(history);
                }

                return Ok(new { completion = completionText });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    public class PromptRequest
    {
        public string Prompt { get; set; } = null!;
    }
}