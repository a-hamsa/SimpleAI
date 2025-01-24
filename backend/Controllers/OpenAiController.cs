using Azure;
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenAiController : ControllerBase
    {
        private readonly OpenAIClient _client;

        public OpenAiController()
        {
            string? endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT");
            if (string.IsNullOrEmpty(endpoint))
                throw new InvalidOperationException("Environment variable 'AZURE_OPENAI_ENDPOINT' is not set.");

            // Use DefaultAzureCredential for Entra ID Authentication
            _client = new OpenAIClient(new Uri(endpoint), new DefaultAzureCredential());

            // Uncomment below for Key Authentication
            string? key = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY");
            if (string.IsNullOrEmpty(key))
                throw new InvalidOperationException("Environment variable 'AZURE_OPENAI_API_KEY' is not set.");
            _client = new OpenAIClient(new Uri(endpoint), new AzureKeyCredential(key));
        }

        [HttpPost("complete")]
        public async Task<IActionResult> GenerateCompletion([FromBody] CompletionRequest request)
        {
            if (string.IsNullOrEmpty(request.Prompt))
                return BadRequest(new { error = "Prompt cannot be null or empty." });

            try
            {
                var completionsOptions = new CompletionsOptions
                {
                    Prompts = { request.Prompt },
                    MaxTokens = request.MaxTokens,
                    Temperature = request.Temperature,
                    FrequencyPenalty = request.FrequencyPenalty,
                    PresencePenalty = request.PresencePenalty
                };

                var completionsResponse = await _client.GetCompletionsAsync(request.DeploymentName, completionsOptions);

                string completionText = completionsResponse.Value.Choices[0].Text;

                return Ok(new { completion = completionText });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    public class CompletionRequest
    {
        public string DeploymentName { get; set; } = "babbage-002";
        public string Prompt { get; set; } = null!;
        public int MaxTokens { get; set; } = 100;
        public float Temperature { get; set; } = 1.0f;
        public float FrequencyPenalty { get; set; } = 0.0f;
        public float PresencePenalty { get; set; } = 0.0f;
    }
}